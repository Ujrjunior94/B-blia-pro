import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './styles/themeConstants.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { initGlobalErrorHandlers } from './services/errorLogger.ts';
import './index.css';

// Initialize production error monitoring & global handlers
initGlobalErrorHandlers();

// Register Service Worker for PWA support (in production only to avoid Vite dev HMR cache conflicts)
const isDev = process.env.NODE_ENV === 'development' || Boolean((import.meta as any).env?.DEV);

if ('serviceWorker' in navigator) {
  if (isDev) {
    // Unregister active service worker during development so stale caches don't break Vite modules
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().catch((err) => console.warn('Failed to unregister SW in dev mode:', err));
      }
    }).catch((err) => console.warn('Failed to get SW registrations:', err));
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('PWA ServiceWorker registered with scope:', registration.scope);
        
        // Auto-update check
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('Novo conteúdo disponível em segundo plano; atualizando automaticamente...');
                installingWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            };
          }
        };
      }).catch((err) => {
        console.warn('PWA ServiceWorker registration failed:', err);
      });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);



