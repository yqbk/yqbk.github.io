const CACHE_NAME = "yqbk-v3";

const CACHED_URLS = [
	"/",
	"/index.html",
	"/cv.html",
	"/stylesheets/style.css",
	"/stylesheets/cv.css",
	"/stylesheets/fontello.css",
	"/font/fontello.woff2?92729447",
	"/images/me.webp",
	"/images/favicon-32.png",
];

self.addEventListener("install", (e) => {
	e.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(CACHED_URLS)),
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) =>
				Promise.all(
					cacheNames
						.filter(
							(cacheName) =>
								cacheName.startsWith("yqbk") && cacheName !== CACHE_NAME,
						)
						.map((cacheName) => caches.delete(cacheName)),
				),
			),
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => response || fetch(event.request)),
	);
});
