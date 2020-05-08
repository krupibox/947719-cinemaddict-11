import {createShowMoreButtonTemplate} from './show-more-button-tpl';
import AbstractComponent from '../abstract';

export default class ShowMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate(this._profile);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
