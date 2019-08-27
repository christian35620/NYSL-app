importScripts('./cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       './',
       './index.html',
       './styles/styles.css',
       './scripts/nysl_mobile.js'
     ]);
   })
 );
});