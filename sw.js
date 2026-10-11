const V = "omniface-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(V)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const allowed =
    url.origin === location.origin ||
    url.hostname === "cdn.jsdelivr.net" ||
    url.hostname === "storage.googleapis.com" ||
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com";

  if (!allowed) return;

  e.respondWith(
    caches.open(V).then(async (cache) => {
      const hit = await cache.match(req);
      if (hit) {
        // Stale-while-revalidate for local assets
        if (url.origin === location.origin) {
          fetch(req)
            .then((r) => {
              if (r.ok) cache.put(req, r.clone());
            })
            .catch(() => {});
        }
        return hit;
      }
      try {
        const r = await fetch(req);
        if (r.ok || r.type === "opaque") {
          cache.put(req, r.clone());
        }
        return r;
      } catch (err) {
        return Response.error();
      }
    })
  );
});
