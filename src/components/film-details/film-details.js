import { createFilmDetailsTemplate } from './film-details-tpl';
import AbstractSmartComponent from '../abstract-smart-component';

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._isWatchlist = film.isWatchlist,
    this._isWatched = film._isWatched,
    this._isFavorite = film._isFavorite
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      isWatchlist: this._isWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
    });
  }

  setButtonCloseClickHandler(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);

    this._onCloseButtonClick = cb;
  }

  setButtonWatchListClickHandler(cb) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, cb);

    this._onButtonWatchListClick = cb;
  }

  setButtonWatchedClickHandler(cb) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, cb);

    this._onButtonWatchedClick = cb;
  }

  setButtonFavoriteClickHandler(cb) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, cb);

    this._onButtonFavoriteClick = cb;
  }

  setEmojiClickHandler(cb) {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, cb);

    this._onEmojiClickHandler = cb;
  }

  recoveryListeners() {
    const element = this.getElement();

    element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseButtonClick);

    element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._onButtonWatchListClick);

    element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._onButtonWatchedClick);

    element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._onButtonFavoriteClick);

    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._onEmojiClickHandler);
  }
}
