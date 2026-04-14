// sw.js - Service Worker mínimo para desarrollo
const CACHE_NAME = 'aprende-jugando-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/core/theme.js',
  '/js/core/auth.js',
  '/js/core/router.js',
  '/js/core/app.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

console.log('✅ Service Worker registrado');
