const CACHE = 'pt-cache-v1';
const FILES = [
  '/',
  '/index.html',
  '/signup.html',
  '/reset-pass.html',
  '/dashboard/index.html',
  '/assets/css/variables.css',
  '/assets/css/base.css',
  '/assets/css/components.css',
  '/assets/css/auth.css',
  '/assets/css/dashboard.css',
  '/assets/js/theme.js',
  '/assets/js/utils.js',
  '/assets/js/auth.js',
  '/assets/js/data.js',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
