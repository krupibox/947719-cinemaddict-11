import {getFilmsByFilter} from '../utils/get-films-by-filter';
import {FilterTypes} from '../consts';

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

  getFilmsDefault() {
    return this._films;
  }

  setFilms(films) {
    this._films = [].concat(this._films, films);
  }

  activeHandlers() {
    this._callHandlers(this._dataChangeHandlers);
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(oldFilmId, newFilm) {
    const index = this._findFilmIndex(oldFilmId);

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
    this.activeHandlers();
  }

  setFilterType(filterType) {
    this._activeFilter = filterType;
    this.activeHandlers();
  }

  setOnDataChange(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setOnFilterChange(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _findFilmIndex(oldFilmId) {
    return this._films.findIndex((film) => film.id === oldFilmId);
  }
}
