let cacheStorageKey = 'pwa-1'; // 用于更新SW
let cacheList = [ // 缓存文件列表
    "/",
    "./index.html",
    "./main.css",
    "./icon.png",
    "./manifest.json"
];

self.addEventListener("install", e=> {
    e.waitUntil( // 确保 Service Work 不会在 waitUntil()里面的代码执行完毕之前安装完成。
        caches.open(cacheStorageKey) // 创建这个版本的缓存
        .then(cache=> cache.addAll(cacheList)) // 缓存资源
        .then(()=>self.skipWaiting()) // 为了在页面更新的过程当中, 新的 Service Worker 脚本能立即激活和生效。
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
        // 清理旧版本
        caches.keys().then(cacheNames=> {
            return Promise.all(
                cacheNames.filter(cacheNames=> {
                    return cacheNames !== cacheStorageKey
                }).map(cacheNames=> {
                    // 清理过期的缓存文件
                    return caches.delete(cacheNames);
                })
            ).then(()=>{
                return self.clients.claim(); // 更新所有客户端上的 Service Worker
            })
        })
    );
});