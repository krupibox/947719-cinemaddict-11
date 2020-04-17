import { createFilmDetailsTemplate } from './film-details-tpl';
import AbstractComponent from '../abstract';

export default class FilmDetailsComponent extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card);
  }
}
