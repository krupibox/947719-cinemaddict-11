import { createElement } from '../../utils';
import { createFilmsStatistics } from './film-statistics-tpl';

export default class FilmsStatisticsComponent {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createFilmsStatistics(this._profile);
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
