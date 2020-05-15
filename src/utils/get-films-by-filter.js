import {FilterTypes} from '../consts';

export const getFilmsByFilter = (films, type) => {
  switch (type) {
    case FilterTypes.ALL:
      return films;
    case FilterTypes.WATCHLIST:
      return films.filter((film) => film.isWatchlist);
    case FilterTypes.HISTORY:
      return films.filter((film) => film.isWatched);
    case FilterTypes.FAVORITES:
      return films.filter((film) => film.isFavorite);
  }

  return false;
};
