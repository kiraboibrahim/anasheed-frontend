window.addEventListener("load", function() {
  cache_name = ['anasheed_v1'];
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
    //event.waitUntil();
  }); // End install

  self.addEventListener("activate", function(event) {

  }); // End activate

  // Listen for fetch events
  //self.addEventListener('')
}); // End load
