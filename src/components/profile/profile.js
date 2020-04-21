import {createProfileTemplate} from './profile-tpl';
import AbstractComponent from '../abstract';

export default class ProfileComponent extends AbstractComponent {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return createProfileTemplate(this._profile);
  }
}
