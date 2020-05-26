import {createProfileTemplate} from './profile-tpl';
import AbstractComponent from '../abstract';
import {replaceElement} from '../../utils/render';

export default class ProfileComponent extends AbstractComponent {
  constructor(profile) {
    super();

    this._profile = profile;
    this._oldProfileComponent = null;    
  }

  getTemplate() {
    return createProfileTemplate(this._profile);
  }

  rerender(films) {
    this._profile = films;
    
    this._oldStatusComponent = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replaceElement(newElement, this._oldStatusComponent);
  }
}
