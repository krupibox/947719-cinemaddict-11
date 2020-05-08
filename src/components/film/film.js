import { createFilmCardTemplate } from './film-tpl';
import AbstractComponent from '../abstract';

export default class FilmsCardComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, {
      isWatchlist: this._film.isWatchlist,
      isWatched: this._film.isWatched,
      isFavorite: this._film.isFavorite
    });
  }

  setFilmClickHandler(cb) {
    this.getElement().addEventListener(`click`, cb);
  }

  setButtonWatchListClickHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, cb);
  }

  setButtonWatchedClickHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, cb);
  }

  setButtonFavoriteClickHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, cb);
  }
}
