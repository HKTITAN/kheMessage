const CACHE_VERSION = '2026-02-01'
const CACHE_NAME = `kheMessage-${CACHE_VERSION}`
const FONT_CACHE = `kheMessage-fonts-${CACHE_VERSION}`
const CURSOR_CACHE = `kheMessage-cursors-${CACHE_VERSION}`

const CORE_ASSETS = [
  '/',
  '/qr',
  '/qrcode.js',
  '/404.html',
  '/manifest.json'
]

const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)),
      caches.open(FONT_CACHE).then((cache) => cache.addAll(FONT_URLS))
    ]).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            !cacheName.includes(CACHE_VERSION) &&
            (cacheName.startsWith('kheMessage-') || 
             cacheName.startsWith('kheMessage-fonts-') ||
             cacheName.startsWith('kheMessage-cursors-'))
          ) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle Google Fonts CSS
  if (url.origin === 'https://fonts.googleapis.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone())
            return networkResponse
          })
        })
      })
    )
    return
  }

  // Handle Google Fonts files (woff2)
  if (url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          })
        })
      })
    )
    return
  }

  // Handle custom cursor files
  if (url.pathname.includes('windows_11_cursors_concept') || 
      url.pathname.endsWith('.cur') || 
      url.pathname.endsWith('.ani')) {
    event.respondWith(
      caches.open(CURSOR_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          }).catch(() => response)
        })
      })
    )
    return
  }

  // Handle core assets with network-first strategy for HTML, cache-first for others
  if (url.origin === location.origin) {
    const isHTML = request.headers.get('accept')?.includes('text/html') || 
                   url.pathname === '/' || 
                   url.pathname === '/qr'
    
    if (isHTML) {
      // Network-first for HTML (to get latest version)
      event.respondWith(
        fetch(request)
          .then((response) => {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
            return response
          })
          .catch(() => {
            return caches.match(request).then((response) => {
              return response || caches.match('/404.html')
            })
          })
      )
    } else {
      // Cache-first for other assets
      event.respondWith(
        caches.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              const responseClone = networkResponse.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone)
              })
            }
            return networkResponse
          })
        })
      )
    }
  }
})
