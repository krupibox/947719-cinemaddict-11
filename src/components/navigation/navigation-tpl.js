export const createNavigationTemplate = (filters) => {

  const countFavorite = filters.filter((status) => status.isFavorite);
  const countWatched = filters.filter((status) => status.isWatched);
  const countWatchlistAdded = filters.filter((status) => status.isWatchlistAdded);

  return `<nav class="main-navigation">
              <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
              <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${countFavorite.length}</span></a>
              <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${countWatched.length}</span></a>
              <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${countWatchlistAdded.length}</span></a>
              <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
            </nav>`;
};
