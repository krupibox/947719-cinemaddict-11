import {FilterTypes} from '../consts';

export const getIsWatchlistFilms = (films) => {
  return films.filter((film) => film.isWatchlist);
};

export const getIsHistoryFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

export const getIsFavoritesFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getFilmsByFilter = (films, type) => {
  switch (type) {
    case FilterTypes.ALL:
      return films;
    case FilterTypes.WATCHLIST:
      return getIsWatchlistFilms(films);
    case FilterTypes.HISTORY:
      return getIsHistoryFilms(films);
    case FilterTypes.FAVORITES:
      return getIsFavoritesFilms(films);
  }

  return false;
};
