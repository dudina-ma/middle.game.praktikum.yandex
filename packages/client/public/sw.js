const CACHE_NAME = 'battleship-cache-v1';

const URLS = [
    '/',
    '/offline.html',
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
                    if (response && response.ok && response.type === 'basic') {
                        const clone = response.clone();
                        event.waitUntil(
                            caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, clone))
                        );
                    }
                    return response;
                })
                .catch(() =>
                    caches.match(event.request)
                        .then(cached => cached || caches.match(new URL('/', self.location.origin).href))
                        .then(cachedShell =>
                            cachedShell || caches.match(new URL('/offline.html', self.location.origin).href)
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
                        if (response && response.ok && response.type === 'basic') {
                            const clone = response.clone();
                            event.waitUntil(
                                caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, clone))
                            );
                        }
                        return response;
                    })
                    .catch((err) => { throw err; });
            })
    );
});
