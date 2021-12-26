let cache_name = 'anasheed_v1';

// Use this during activation
let expected_caches = [
  'anasheed_v1'
];
let urls_to_cache = [
  'css/reuse.css',
  'css/normalize.css',
  'css/bootstrap.min.css',
  'css/audio-player.css',

  'js/bootstrap.min.js',
  'js/jquery-3.6.0.min.js',
  'js/lazyloading.js',
  'js/audio-player.js',
  'js/nav.js',
];
/*
  Service Workers go through the following events after successful  registration
    install
    activate
*/

self.addEventListener("install", function(event) {
  /*
    If there is an active service worker, activate the new one immediately without waiting
   */
  self.skipWaiting();
  event.waitUntil(
    caches.open(cache_name)
    .then(function(cache) {
      //console.log("Opened cache file");
      return cache.addAll(urls_to_cache);
    })
  ); // End waitUntil
  //console.log("Installed");
}); // End install

self.addEventListener("activate", function(event) {
  // When the service worker is updated, you will want to clean up some old caches
}); // End activate

// Listen for fetch events
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          console.log("Serving cached file");
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var response_to_cache = response.clone();

            caches.open(cache_name)
              .then(function(cache) {
                cache.put(event.request, response_to_cache);
              });

            return response;
          }
        );
      })
    );
}); // End fetch
