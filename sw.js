// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - SERVICE WORKER (MÍNIMO)
// ═══════════════════════════════════════════════════════════════

const CACHE_NAME = 'aprende-jugando-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/core/app.js',
  '/js/core/theme.js',
  '/js/core/auth.js',
  '/js/core/router.js'
];

// Install: cachear assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch: servir desde caché si está disponible
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

console.log('✅ Service Worker registrado');
