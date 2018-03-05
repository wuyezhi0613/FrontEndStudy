var cacheStorageKey = 'minimal-pwa-1';
var cacheList = [
    "/",
    "./index.html",
    "./main.css",
    "./icon.png",
    "./manifest.json"
];

self.addEventListener("install", e=> {
    e.waitUntil(
        caches.open(cacheStorageKey)
        .then(cache=> cache.addAll(cacheList))
        .then(()=>self.skipWaiting())
    )
});

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response !== null) {
                return response;
            }
            return fetch(e.request.url);
        })
    );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(cacheNames=> {
            return Promise.all(
                cacheNames.filter(cacheNames=> {
                    return cacheNames !== cacheStorageKey
                }).map(cacheNames=> {
                    return caches.delete(cacheNames);
                })
            ).then(()=>{
                return self.clients.clain();
            })
        })
    );
})