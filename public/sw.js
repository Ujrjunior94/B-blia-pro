// Service Worker for Jornada da Bíblia PWA
const CACHE_NAME = 'jornada-biblia-v4';
const BIBLE_CACHE = 'jornada-biblia-text-v1';
const FONT_CACHE = 'jornada-biblia-fonts-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// Install Event: cache offline shell & critical static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)),
      caches.open(BIBLE_CACHE)
    ])
  );
  self.skipWaiting();
});

// Activate Event: clear legacy caches & claim clients immediately
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, BIBLE_CACHE, FONT_CACHE];
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

// Message Listener
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'PRECACHE_BIBLE_DATA') {
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
              console.warn('[Service Worker] Background pre-cache failed for:', url, e);
            }
          }
        }
      })
    );
  }
});

// Fetch Event: Strategic Cache Routing
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip dev server, internal Vite scripts, API calls, extensions, and Firebase
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.includes('node_modules') ||
    url.search.includes('v=') ||
    url.search.includes('import') ||
    url.protocol.startsWith('chrome-extension') ||
    url.hostname.includes('firestore') ||
    url.hostname.includes('identitytoolkit') ||
    url.hostname.includes('firebase') ||
    url.hostname.includes('localhost') ||
    url.hostname === '127.0.0.1'
  ) {
    return; // Allow network to handle directly
  }

  // Strategy 1: Cache First for Google Fonts
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(FONT_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Check if request is for HTML navigation
  const isNavigation = event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'));

  // Strategy 2: Stale-While-Revalidate for production static assets & navigation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            const targetCache = url.pathname.includes('/data/') || url.pathname.includes('/bible/') ? BIBLE_CACHE : CACHE_NAME;
            caches.open(targetCache).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch((err) => {
          console.warn('[Service Worker] Fetch failed for:', url.pathname, err);
          if (cachedResponse) return cachedResponse;
          // Fallback to index.html ONLY for HTML navigation requests
          if (isNavigation) {
            return caches.match('/index.html');
          }
          return Response.error();
        });

      return cachedResponse || fetchPromise;
    })
  );
});


