import {createElement} from '../utils';

const createFilmsStatistics = (movies) => {
  return `<section class="footer__statistics">
            <p>${movies.length} movies inside</p>
          </section>`;
};

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
