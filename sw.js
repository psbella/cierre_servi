const CACHE_NAME = 'cierre-turno-v1';
const FILES_TO_CACHE = [
    '/cierre_servi/',
    '/cierre_servi/index.html',
    '/cierre_servi/css/styles.css',
    '/cierre_servi/js/utils.js',
    '/cierre_servi/js/calculations.js',
    '/cierre_servi/js/pdf.js',
    '/cierre_servi/js/share.js',
    '/cierre_servi/js/main.js',
    '/cierre_servi/manifest.json',
    '/cierre_servi/favicon.svg',
    '/cierre_servi/icon-192x192.png',
    '/cierre_servi/icon-512x512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Archivos cacheados');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('Cache vieja eliminada:', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// ESTRATEGIA: NETWORK FIRST (para desarrollo)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
