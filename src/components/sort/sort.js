import {createSortTemplate} from './sort-tpl';
import AbstractComponent from '../abstract';

export default class SortComponent extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }

  setClickHandler(cb) {    
    this.getElement().querySelectorAll(`.sort__button`)
    .forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        if (!evt.target.classList.contains(`sort__button--active`)) {
          this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
          element.classList.add(`sort__button--active`);
          
          cb(element.dataset.sortType);
        }
      });
    });
  }
}