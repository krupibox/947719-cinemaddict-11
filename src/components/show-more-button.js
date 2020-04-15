import {createElement} from '../utils';

const createButtonShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButtonComponent {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createButtonShowMoreTemplate(this._profile);
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
