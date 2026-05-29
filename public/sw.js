// Minimal service worker: makes the app installable on Android and caches the
// app shell for fast/offline launches. It deliberately does NOT cache the big
// media (songs / montage) so seeking/range-requests keep working and the cache
// stays small.

const CACHE = 'friendship-wrapped-v1'
const SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  // Let the browser stream big media directly (supports HTTP range requests).
  if (url.pathname.startsWith('/assets/songs') || url.pathname.startsWith('/assets/montage')) {
    return
  }

  // cache-first for the shell + images, falling back to network, then index.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((res) => {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {})
            return res
          })
          .catch(() => caches.match('/index.html')),
    ),
  )
})
