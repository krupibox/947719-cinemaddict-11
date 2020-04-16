import { createElement } from '../../utils';
import { createShowMoreButtonTemplate } from './show-more-button-tpl';

export default class ShowMoreButtonComponent {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate(this._profile);
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
