import AbstractSmartComponent from '../abstract-smart-component';
import { getFormatDateComment } from '../../utils/get-format-date-comment';
import { DefaultData, LoadingData } from '../../consts';

const createCommentsTemplate = (comment, externalData) => {
  const isBlock = externalData.deleteButtonText === LoadingData.deleteButtonText;
  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          ${comment.emotion ? `<img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji">` : ``}
        </span>
        <div>
          <p class="film-details__comment-text">${comment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${getFormatDateComment(comment.date)}</span>
            <button
                class="film-details__comment-delete"
                type="button"
                data-mess-id="${comment.id}"
                ${isBlock ? `disabled` : ``}>
                    ${externalData.deleteButtonText}
            </button>
          </p>
        </div>
     </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(filmComment) {
    super();

    this._filmComment = filmComment;
    this._externalData = DefaultData;

    this._onDeleteButtonClick = null;
  }

  getTemplate() {    
    return createCommentsTemplate(this._filmComment, this._externalData);
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
    this._externalData = Object.assign({}, DefaultData, buttonText);
    this.rerender();
  }

  returnData() {
    this.setData({ deleteButtonText: DefaultData.deleteButtonText });
  }

  _subscribeOnEvents() {
    this.setOnDeleteButtonClick(this._onDeleteButtonClick);
  }
}
