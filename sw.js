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
	self.skipWaiting();
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
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	const isDocument = request.destination === "document" || request.mode === "navigate";

	if (isDocument) {
		// Network-first for HTML: always try to get a fresh page, fall back to cache
		event.respondWith(
			fetch(request)
				.then((response) => {
					const clone = response.clone();
					caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
					return response;
				})
				.catch(() => caches.match(request)),
		);
	} else {
		// Stale-while-revalidate for static assets: serve from cache instantly, update in background
		event.respondWith(
			caches.open(CACHE_NAME).then((cache) =>
				cache.match(request).then((cached) => {
					const networkFetch = fetch(request).then((response) => {
						cache.put(request, response.clone());
						return response;
					});
					return cached || networkFetch;
				}),
			),
		);
	}
});
