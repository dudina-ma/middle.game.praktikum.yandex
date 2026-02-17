const CACHE_NAME = 'battleship-cache-v1';

const URLS = [
    '/',
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    if (new URL(event.request.url).origin !== self.location.origin) return;

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                })
                .catch(() =>
                    caches.match(event.request).then(cached =>
                        cached || new Response(
                            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Офлайн</title></head><body><p>Нет соединения с интернетом. Часть приложения доступна офлайн — откройте страницу снова, когда сеть будет доступна, чтобы подгрузить актуальные данные.</p></body></html>',
                            { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': 'text/html; charset=utf-8' } }
                        )
                    )
                )
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                return fetch(event.request)
                    .then(response => {
                        if (response && response.status === 200) {
                            const clone = response.clone();
                            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                        }
                        return response;
                    })
                    .catch((err) => { throw err; });
            })
    );
});
