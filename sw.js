const cacheName = 'exercise-app-v1';
const filesToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json',
  './arzoo-config.js',
  './default-config.js',
  './main-config.js',
  './main-1.js',
  './main-2.js',
  './main-3.js',
  './main-4.js',
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