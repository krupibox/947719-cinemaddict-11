import { createFilmDetailsTemplate } from './film-details-tpl';
import AbstractSmartComponent from '../abstract-smart-component';

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;

    this._isWatchlist = card.isWatchlist,
    this._isWatched = card._isWatched,
    this._isFavorite = card._isFavorite

    this._subscribeOnEvents();    
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    // this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card, {
      isWatchlist: this._isWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
    });
  }

  setButtonCloseClickHandler(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }


  setButtonWatchListClickHandler(cb) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, cb);

    this.rerender();
  }

  setButtonWatchedClickHandler(cb) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, cb);

    this.rerender();
  }

  setButtonFavoriteClickHandler(cb) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, cb);

    this.rerender();
  }

  // WIP

  _subscribeOnEvents() {

    const element = this.getElement();
    
    element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        this._isWatchlist = !this._isWatchlist;

        console.log(this);
        
        this.rerender();
      });

      element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        this._isWatched = !this._isWatched;

        this.rerender();
      });


      element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;

        this.rerender();
      });

  }

}
