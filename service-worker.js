const staticCacheName = 'pages-cache-v1';

const filesToCache = [
    '/',
    '/style.css',
    '/anfahrt.html',
    '/beachten.html',
    '/dorf.html',
    '/essen.html',
    '/gasse.html',
    '/hafen.html',
    '/main.html',
    '/muretto.html',
    '/pontile.html',
    '/promenade.html',
    '/strand.html',
    '/uebersicht.html',
    '/images/anfahrt_nok.jpg',
    '/images/anfahrt_ok.jpg',
    '/images/back_arrow.png',
    '/images/gasse.jpg',
    '/images/hafen.jpg',
    '/images/karte.jpg',
    '/images/laigueglia.jpg',
    '/images/leuchtturm.jpg',
    '/images/mauer.jpg',
    '/images/ponte.jpg',
    '/images/promenade.jpg',
];

self.addEventListener('install', event => {
    // self.skipWaiting();
    console.log('Install service worker and cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request);
        })
    )
})

self.addEventListener('activate', (e) => {
    console.log("Activating SW");
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});