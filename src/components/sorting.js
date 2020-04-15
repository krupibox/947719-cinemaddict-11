import {createElement} from '../utils';

const createSortNavTemplate = () => {
  return (
    `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button sort__button--by-date">Sort by date</a></li>
        <li><a href="#" class="sort__button sort__button--by-rating">Sort by rating</a></li>
    </ul>`
  );
};

class Sorting {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortNavTemplate();
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

export default Sorting;
