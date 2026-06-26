const cacheName = 'exercise-app-v1';
const filesToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
  './config.js'
];

// Install Service Worker and cache essential files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Network-first strategy with cache fallback
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});