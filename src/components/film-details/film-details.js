import {createFilmDetailsTemplate} from './film-details-tpl';
import AbstractComponent from '../abstract';

export default class FilmDetailsComponent extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getCloseButton() {
    return this.getElement().querySelector(`.film-details__close-btn`);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card);
  }

  setClickHandler(cb) {
    this.getElement().addEventListener(`click`, cb);
  }
}
