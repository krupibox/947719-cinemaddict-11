import { createFilmDetailsTemplate } from './film-details-tpl';
import AbstractSmartComponent from '../abstract-smart-component';
import { KeyCode, TypeEmoji } from '../../consts';

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._commentText = null;
    this._elementsForBlock = [];
    this._emoji = null;

    this._onCloseButtonClick = null;
    this._onEscapeKeyDown = null;
    this._onButtonWatchListClick = null;
    this._onButtonWatchedClick = null;
    this._onButtonFavoriteClick = null;
    this._onSendCommentPressEnter = null;
    this._onResetRatingFilmClick = null;
    this._onEmojiClick = null;
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      isRated: !!this._film.userRating,
      isWatched: !!this._film.isWatched,
      isWatchlist: !!this._film.isWatchlist,
      isFavorite: !!this._film.isFavorite,
      userEmoji: this._emoji
    });
  }

  setOnCloseButtonClick(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);

    this._onCloseButtonClick = cb;
  }

  setOnEscapeKeyDown(cb) {
    document.body.addEventListener(`click`, cb);

    this._onEscapeKeyDown = cb;
  }

  setOnButtonWatchListClick(cb) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, cb);

    this._onButtonWatchListClick = cb;
  }

  setOnButtonWatchedClick(cb) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, cb);

    this._onButtonWatchedClick = cb;
  }

  setOnButtonFavoriteClick(cb) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, cb);

    this._onButtonFavoriteClick = cb;
  }

  setOnEmojiClick(cb) {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {     
        this._emoji = TypeEmoji[evt.target.value];        
        this._commentText = this.getElement().querySelector(`.film-details__comment-input`).value;
  
        cb();
      });
    this._onEmojiClick = cb;
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
      this._isPressEnter(evt, cb);
    });

    this._onSendCommentPressEnter = cb;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.getElement().querySelector(`.film-details__comment-input`).value = this._commentText;
  }

  _subscribeOnEvents() {
    this.setOnCloseButtonClick(this._onCloseButtonClick);
    this.setOnEscapeKeyDown(this._onEscapeKeyDown);
    this.setOnButtonWatchListClick(this._onButtonWatchListClick);
    this.setOnButtonWatchedClick(this._onButtonWatchedClick);
    this.setOnButtonFavoriteClick(this._onButtonFavoriteClick);
    this.setOnEmojiClick(this._onEmojiClick);
    this.setOnSendCommentPressEnter(this._onSendCommentPressEnter);
    this.setOnChangeRatingFilmClick(this._onResetRatingFilmClick);
  }

  _onSendComment() {
    const text = this.getElement().querySelector(`.film-details__comment-input`);
        
    return {
      'id': 0,
      'author': `Jack Daniels`,
      'comment': text.value,
      'date': new Date(),
      'emotion': this._emoji,

    };
  }

  _isPressEnter(evt, cb) {
    if (evt.key === KeyCode.ENTER) {
      cb(this._onSendComment());
    }
  }
}
