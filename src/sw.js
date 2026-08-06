// Service Worker for Jornada da Bíblia PWA (Stale-While-Revalidate Strategy)
const CACHE_NAME = 'jornada-biblia-v6';
const BIBLE_CACHE = 'jornada-biblia-text-v3';
const NOTES_CACHE = 'jornada-biblia-notes-v2';
const FONT_CACHE = 'jornada-biblia-fonts-v2';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// Install Event: pre-cache offline shell & critical static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)),
      caches.open(BIBLE_CACHE),
      caches.open(NOTES_CACHE),
      caches.open(FONT_CACHE)
    ])
  );
  self.skipWaiting();
});

// Activate Event: clear legacy caches & claim clients immediately
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, BIBLE_CACHE, NOTES_CACHE, FONT_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!currentCaches.includes(cache)) {
            console.log('[Service Worker] Removing legacy cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Message Listener: Background Sync and Pre-caching
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data.type === 'PRECACHE_BIBLE_DATA') {
    event.waitUntil(
      caches.open(BIBLE_CACHE).then(async (cache) => {
        if (event.data.urls && Array.isArray(event.data.urls)) {
          for (const url of event.data.urls) {
            try {
              const response = await fetch(url);
              if (response.ok) {
                await cache.put(url, response);
              }
            } catch (e) {
              console.warn('[Service Worker] Background Bible pre-cache failed for:', url, e);
            }
          }
        }
      })
    );
  } else if (event.data.type === 'SYNC_USER_NOTES') {
    // Cache local user notes payload for offline availability
    event.waitUntil(
      caches.open(NOTES_CACHE).then(async (cache) => {
        if (event.data.payload) {
          const blob = new Blob([JSON.stringify(event.data.payload)], { type: 'application/json' });
          const response = new Response(blob, { status: 200, statusText: 'OK' });
          await cache.put('/api/offline-user-notes', response);
        }
      })
    );
  }
});

/**
 * Stale-While-Revalidate helper function
 * Returns cached content instantly while fetching and updating cache in the background.
 */
function staleWhileRevalidate(request, cacheName, fallbackResponseFn) {
  return caches.open(cacheName).then((cache) => {
    return cache.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch((err) => {
          console.warn('[Service Worker] Background revalidation failed for:', request.url, err);
          if (cachedResponse) return cachedResponse;
          if (fallbackResponseFn) return fallbackResponseFn();
          return new Response(JSON.stringify({ error: 'Conteúdo indisponível offline' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        });

      // Serve from cache immediately if available, otherwise await network response
      return cachedResponse || fetchPromise;
    });
  });
}

// Fetch Event: Strategic Cache Routing with Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip dev server, internal Vite scripts, chrome extensions, and live auth
  if (
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.includes('node_modules') ||
    url.search.includes('v=') ||
    url.search.includes('import') ||
    url.protocol.startsWith('chrome-extension') ||
    url.hostname.includes('identitytoolkit') ||
    url.hostname.includes('localhost') ||
    url.hostname === '127.0.0.1'
  ) {
    return; // Allow network to handle directly in development
  }

  // 1. Google Fonts -> Stale-While-Revalidate
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(staleWhileRevalidate(event.request, FONT_CACHE));
    return;
  }

  // 2. Bible Text & Data Resources -> Stale-While-Revalidate
  if (url.pathname.includes('/bible/') || url.pathname.includes('/data/') || url.pathname.endsWith('.json')) {
    event.respondWith(
      staleWhileRevalidate(event.request, BIBLE_CACHE, () => {
        return new Response(JSON.stringify({ error: 'Bíblia indisponível offline' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // 3. Offline User Notes Backup -> Stale-While-Revalidate
  if (url.pathname.includes('/offline-user-notes')) {
    event.respondWith(
      staleWhileRevalidate(event.request, NOTES_CACHE, () => {
        return new Response(JSON.stringify({ notes: [], offline: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // 4. Primary Web Assets and HTML Navigation -> Stale-While-Revalidate
  const isNavigation = event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'));

  event.respondWith(
    staleWhileRevalidate(event.request, CACHE_NAME, () => {
      if (isNavigation) {
        return caches.match('/index.html');
      }
      return Response.error();
    })
  );
});
