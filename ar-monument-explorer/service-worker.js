// Service Worker for offline support
const CACHE_NAME = 'monument-ar-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts/main.js',
  '/scripts/qrscanner.js',
  '/scripts/ar-controller.js',
  '/scripts/analytics.js',
  '/scripts/feedback.js',
  '/scripts/sharing.js',
  '/scripts/error-handler.js',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png'
  // Add other important assets here
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use a more resilient approach - cache what we can
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(error => {
              console.warn(`Failed to cache: ${url}`, error);
            })
          )
        );
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
}); 