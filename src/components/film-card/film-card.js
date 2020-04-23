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

  setClickHandler(cb) {
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
