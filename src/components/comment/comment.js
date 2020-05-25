import { createCommentsTemplate } from './comment-tpl';
import AbstractSmartComponent from '../abstract-smart-component';
import { DataDefault } from '../../consts';

export default class Comment extends AbstractSmartComponent {
  constructor(filmComment) {
    super();

    this._filmComment = filmComment;    
    this._dataStatus = DataDefault;

    this._onDeleteButtonClick = null;
  }

  getTemplate() {    
    return createCommentsTemplate(this._filmComment, this._dataStatus);
  }
  
  recoveryListeners() {
    this._subscribeOnEvents();
  }

  setOnDeleteButtonClick(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, () => {

        handler(this);
      });
    this._onDeleteButtonClick = handler;
  }

  setData(buttonText) {    
    this._dataStatus = Object.assign({}, DataDefault, buttonText);
    this.rerender();
  }

  returnData() {
    this.setData({ deleteMessage: DataDefault.deleteMessage });
  }

  _subscribeOnEvents() {
    this.setOnDeleteButtonClick(this._onDeleteButtonClick);
  }
}
