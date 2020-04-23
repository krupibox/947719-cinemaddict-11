import {createFilmCardTemplate} from './film-card-tpl';
import AbstractComponent from '../abstract';

export default class FilmsSectionComponent extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setCardClickHandler(cb) {
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
