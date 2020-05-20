import {createNavigationTemplate} from './navigation-tpl';
import AbstractComponent from '../abstract';

export default class NavigationComponent extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }

  setOnFilterChange(handler) {
    
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName === `A` && evt.target.dataset.filterType !== undefined) {        
        handler(evt.target.dataset.filterType);
      }
    });
  }
}
