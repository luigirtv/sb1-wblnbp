/* eslint-disable */
/* tslint:disable */

self.addEventListener('install', function() {
  self.skipWaiting()
})

self.addEventListener('activate', function() {
  self.clients.claim()
})

self.addEventListener('fetch', function(event) {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .catch(function() {
        return new Response('Mock service worker error', {
          status: 503,
          statusText: 'Service Unavailable',
        })
      }),
  )
})