/* My Organiser — service worker
   Caches every file the app needs so it opens with no internet.
   All paths are relative to this file, so it works in a sub-folder (e.g. GitHub Pages).
   When you change any app file, bump VERSION so phones pick up the new copy. */
const VERSION = 'v1.0.0';
const CACHE = 'my-organiser-' + VERSION;
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './lib/jszip.min.js',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(FILES.map(f => new Request(new URL(f, self.registration.scope), { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('my-organiser-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Cache first (instant + offline), then refresh the cached copy in the background
   so small updates arrive on the next launch. Only same-origin GET requests are handled. */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const isPage = req.mode === 'navigate';
    const cached = await cache.match(req, { ignoreSearch: true }) ||
                   (isPage ? await cache.match(new URL('./index.html', self.registration.scope)) : undefined);
    const network = fetch(req).then(res => {
      if (res && res.ok && res.type === 'basic') cache.put(isPage ? new URL('./index.html', self.registration.scope) : req, res.clone());
      return res;
    }).catch(() => undefined);
    if (cached) { event.waitUntil(network); return cached; }
    const res = await network;
    return res || new Response('You are offline and this file is not cached yet.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  })());
});
