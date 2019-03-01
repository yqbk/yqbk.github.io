importScripts("/cache-polyfill.js");

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("yqbk").then(function(cache) {
      return cache.addAll(["/", "/index.html", "/cv.html"]);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log(cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
