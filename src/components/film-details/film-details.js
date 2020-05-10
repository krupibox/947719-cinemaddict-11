import { createFilmDetailsTemplate } from './film-details-tpl';
import AbstractSmartComponent from '../abstract-smart-component';

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._onCloseButtonClick = null;
    this._onEscapeKeyDown = null;
    this._onButtonWatchListClick = null;
    this._onButtonWatchedClick = null;
    this._onButtonFavoriteClick = null;
    this._onEmojiClickHandler = null;
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setButtonCloseClickHandler(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);

    this._onCloseButtonClick = cb;
  }

  setEscapeKeyDownHandler(cb) {
    document.body.addEventListener(`click`, cb);

    this._onEscapeKeyDown = cb;
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

  setOnChangeRatingFilmClick(cb) {
console.log(cb);

    if (this._film.isWatched) {
      this.getElement().querySelector(`.film-details__user-rating-score`)
        .addEventListener(`click`, cb);

        console.log(cb);
        

      this.getElement().querySelector(`.film-details__watched-reset`)
        .addEventListener(`click`, () => {
          this._onResetRatingFilmClick(UNDO_RATING);
        });
    }

    this._onResetRatingFilmClick = cb;
  }

  recoveryListeners() {
    const element = this.getElement();

    element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseButtonClick);

    document.body
      .addEventListener(`click`, this._onEscapeKeyDown);

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
