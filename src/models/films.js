import Comment from './comment';
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

  activateHandlers() {
    this._dataChangeHandlers.forEach((handler) => handler());
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  updateFilm(oldFilmId, newFilm) {
    const index = this._films.findIndex((film) => film.id === oldFilmId);

    // иммутабельность?
    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
    this.activateHandlers();
  }

  setFilterType(filterType) {
    this._activeFilter = filterType;
    this.activateHandlers();
  }

  setOnDataChange(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setOnFilterChange(handler) {
    this._filterChangeHandlers.push(handler);
  }
}
