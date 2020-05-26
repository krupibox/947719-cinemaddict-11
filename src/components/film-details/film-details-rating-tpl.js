import {RATING_NUMBER} from '../../consts';
import {createScoreTemplate} from './film-details-score-tpl';

export const createRatingTemplate = (title, userRating) => {
  const ratingMarkup = createScoreTemplate(RATING_NUMBER, userRating);
  return (
    `<div class="form-details__middle-container">createScoreTemplate
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button">Undo</button>
          </div>
  
          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>
  
            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${title}</h3>
  
              <p class="film-details__user-rating-feelings">How you feel it?</p>
  
              <div class="film-details__user-rating-score">
                ${ratingMarkup}
              </div>
            </section>
          </div>
        </section>
      </div>`
  );
};
