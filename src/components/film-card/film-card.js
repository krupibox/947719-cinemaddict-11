import { createFilmCardTemplate } from './film-card-tpl';
import AbstractComponent from '../abstract';

export default class FilmsSectionComponent extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }
}
