import {Cache, RESPONSE_SUCCESS} from '../src/consts';

const installHandler = (evt) => {
    evt.waitUntil(caches.open(Cache.NAME).then((cache) => cache.addAll([
      `/`,
      `/index.html`,
      `/bundle.js`,
      `/css/normalize.css`,
      `/css/main.css`,
      `/images/emoji/angry.png`,
      `/images/emoji/puke.png`,
      `/images/emoji/sleeping.png`,
      `/images/emoji/smile.png`,
      `/images/emoji/trophy.png`,
      `/images/icons/icon-favorite-active.svg`,
      `/images/icons/icon-favorite.svg`,
      `/images/icons/icon-watched-active.svg`,
      `/images/icons/icon-watched.svg`,
      `/images/icons/icon-watchlist-active.svg`,
      `/images/icons/icon-watchlist.svg`,
      `/images/background.png`,
      `/images/bitmap.png`,
      `/images/bitmap@2x.png`,
      `/images/bitmap@3x.png`
    ]))
    );
  };

  const fetchHandler = (evt) => {
    const {request} = evt;
  
    evt.respondWith(caches.match(request).then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse;
      }
  
      return fetch(request).then((response) => {
        if (!response || response.status !== RESPONSE_SUCCESS || response.type !== `basic`) {
          return response;
        }
  
        const clonedResponse = response.clone();
        caches.open(Cache.NAME).then((cache) => cache.put(request, clonedResponse));
        return response;
      });
    }));
  };