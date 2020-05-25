import { createFilmCardTemplate } from './film-card-tpl';
import AbstractComponent from '../abstract';

export default class FilmsCardComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setOnFilmClick(cb) {
    this.getElement().addEventListener(`click`, cb);
  }

  setOnButtonWatchListClick(cb) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, cb);
  }

  setOnButtonWatchedClick(cb) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, cb);
  }

  setOnButtonFavoriteClick(cb) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, cb);
  }
}
