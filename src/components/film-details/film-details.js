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
    this._onSendCommentPressEnter = null;
    this._onResetRatingFilmClick = null;
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

  setEmojiClick(cb) {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        this._emoji = evt.target.value;
        this._commentText = this.getElement().querySelector(`.film-details__comment-input`).value;

        cb();
      });
    this._onEmojiClickHandler = cb;
  }

  setOnChangeRatingFilmClick(cb) {
    if (this._film.isWatched) {
      this.getElement().querySelector(`.film-details__user-rating-score`)
        .addEventListener(`click`, (evt) => {
          if (!evt.target.classList.contains(`film-details__user-rating-label`)) {
            return;
          }
          this._onResetRatingFilmClick(evt.target.textContent);
        });

      this.getElement().querySelector(`.film-details__watched-reset`)
        .addEventListener(`click`, () => {
          this._onResetRatingFilmClick(UNDO_RATING);
        });

      this._onResetRatingFilmClick = cb;
    }
  }

  setOnSendCommentPressEnter(cb) {
    this.getElement().addEventListener(`keyup`, (evt) => {
      evt.preventDefault();
      this._isCtrlCommandEnterPress(evt, cb);
    });

    this._onSendCommentPressEnter = cb;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.getElement().querySelector(`.film-details__comment-input`).value = this._commentText;
  }

  _subscribeOnEvents() {
    this.setOnCloseButtonClick(this._onCloseButtonClick);
    this.setEscapeKeyDownHandler(this._onEscapeKeyDown);
    this.setOnButtonWatchListClick(this._onButtonWatchListClick);
    this.setOnButtonWatchedClick(this._onButtonWatchedClick);
    this.setOnButtonFavoriteClick(this._onButtonFavoriteClick);
    this.setOnEmojiClickHandler(this._onEmojiClickHandler);
    this.setOnSendCommentPressEnter(this._onSendCommentPressEnter);
    this.setOnResetRatingFilmClick(this._onResetRatingFilmClick);
  }

  _onSendComment() {
    const text = this.getElement().querySelector(`.film-details__comment-input`);

    return {
      'comment': text.value,
      'date': new Date(),
      'emotion': this._emoji,
    };
  }

  _isCtrlCommandEnterPress(evt, cb) {
    console.log(evt.key);

    // Здесь продолжить Code
    if (evt.key === Code.ENTER && evt.ctrlKey || evt.key === Code.ENTER && evt.metaKey) {
      cb(this._onSendComment());
    }
  }
}
