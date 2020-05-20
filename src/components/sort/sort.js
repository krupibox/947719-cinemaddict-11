import { createSortTemplate } from './sort-tpl';
import AbstractSmartComponent from '../abstract-smart-component';
import { SortType, DisplayMode } from '../../consts';

export default class SortComponent extends AbstractSmartComponent {
  constructor() {
    super();

    this._displayMode = DisplayMode.SHOW;
    this._sortType = SortType.DEFAULT;
    this._onSortChangeClick = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setClickHandler(cb) {
    this.getElement().querySelectorAll(`.sort__button`)
      .forEach((element) => {
        element.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          this._resetSort();
          evt.target.classList.add(`sort__button--active`);
          
          this._onSortChangeClick = cb;
 
          cb(element.dataset.sortType);
        });
      });

      this._onSortChangeClick = cb;
  }

  hide() {
    super.hide();
    this._displayMode = DisplayMode.HIDDEN;
  }
  show() {
    super.show();
    this._displayMode = DisplayMode.SHOW;
  }

  setDefaultView() {
    this._resetSort();
    this._sortType = SortType.DEFAULT;

    super.rerender();
  }

  recoveryListeners() {
    this.setClickHandler(this._onSortChangeClick);
  }

  _resetSort() {
    this.getElement().querySelectorAll(`.sort__button--active`)
      .forEach((element) => element.classList.remove(`sort__button--active`));
  }
} 