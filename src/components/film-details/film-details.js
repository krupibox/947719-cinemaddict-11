import { createElement } from '../../utils';
import { createFilmDetailsTemplate } from './film-details-tpl';

export default class FilmDetailsComponent {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
