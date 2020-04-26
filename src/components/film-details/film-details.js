import { createFilmDetailsTemplate } from './film-details-tpl';
import AbstractSmartComponent from '../abstract-smart-component';

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;

    // this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card);
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

}
