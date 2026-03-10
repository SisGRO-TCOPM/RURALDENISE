const CACHE_NAME = "mapa-rural-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "https://unpkg.com/leaflet/dist/leaflet.css",
  "https://unpkg.com/leaflet/dist/leaflet.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {

      if (response) {
        return response;
      }

      return fetch(event.request).then(networkResponse => {

        return caches.open(CACHE_NAME).then(cache => {

          cache.put(event.request, networkResponse.clone());

          return networkResponse;

        });

      });

    })
  );
});
