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
}
