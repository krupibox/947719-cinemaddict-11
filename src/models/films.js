import {getFilmsByFilter} from '../utils/get-films-by-filter';
import {FilterTypes, FilmCount} from '../consts';

export default class Films {
  constructor() {
    this._films = [];

    this._activeFilter = FilterTypes.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilter);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = [].concat(this._films, films);
  }

  activateHandlers(count) {
    this._dataChangeHandlers.forEach((handler) => handler());
    this._filterChangeHandlers.forEach((handler) => {
      if (count) {
        handler(count);

        return;
      }

      handler();
    });
  }

  updateFilmById(oldFilmId, newFilm) {
    const index = this._films.findIndex((film) => film.id === oldFilmId);
    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
    this.activateHandlers();

    return true;
  }

  setFilterType(filterType) {
    this._activeFilter = filterType;
    this.activateHandlers(FilmCount.START);
  }

  setOnDataChange(cb) {
    this._dataChangeHandlers.push(cb);
  }

  setOnFilterChange(cb) {
    this._filterChangeHandlers.push(cb);
  }
}
