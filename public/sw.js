const installHandler = (evt) => {
    evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll([
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
  