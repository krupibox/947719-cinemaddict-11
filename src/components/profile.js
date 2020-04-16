import {createElement} from '../utils';

const createProfileRatingTemplate = (profile) => {
  return `<section class="header__profile profile">
            <p class="profile__rating">${profile.rating}</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
};

export default class ProfileRatingComponent {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._profile);
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
