import { getFormatDateComment } from '../../utils/get-format-date-comment';
import { DataDeleting } from '../../consts';

export const createCommentsTemplate = ({emotion, comment, author, date, id}, data) => {
    const isBlock = data.deleteMessage === DataDeleting.deleteMessage;
    
    return (
      `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            ${emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">` : ``}
          </span>
          <div>
            <p class="film-details__comment-text">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${getFormatDateComment(date)}</span>
              <button
                  class="film-details__comment-delete"
                  type="button"
                  data-mess-id="${id}"
                  ${isBlock ? `disabled` : ``}>
                      ${data.deleteMessage}
              </button>
            </p>
          </div>
       </li>`
    );
  };
