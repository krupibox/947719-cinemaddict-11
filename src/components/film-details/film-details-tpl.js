import { createRatingTemplate } from './film-details-rating-tpl';
import { getFormatDate } from '../../utils/get-format-date';
import { getTimeFromMins } from '../../utils/get-time-from-mins';

export const createFilmDetailsTemplate = (details, options) => {
  const {
    title,
    originalTitle,
    rating,
    userRating,
    ageRating,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    country,
    genres,
    poster,
    description,
    comments } = details;

  const {
    isRated,
    isWatched,
    isFavorite,
    isWatchlist,
    userEmoji } = options;

  const userRatingMarkup = (isWatched && isRated) ? `Your rate ${userRating}` : ``;
  const ratedMarkup = isWatched ? createRatingTemplate(title, userRating) : ``;
  const filmGenres = [...genres].map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
  const filmReleasedDate = getFormatDate(releaseDate);
  const filmDuration = getTimeFromMins(duration);  
  
  return `<section class="film-details">
              <form class="film-details__inner" action="" method="get">
                <div class="form-details__top-container">
                  <div class="film-details__close">
                    <button class="film-details__close-btn" type="button">close</button>
                  </div>
                  <div class="film-details__info-wrap">
                    <div class="film-details__poster">
                      <img class="film-details__poster-img" src="${poster}" alt="">
  
                      <p class="film-details__age">${ageRating}+</p>
                    </div>
  
                    <div class="film-details__info">
                      <div class="film-details__info-head">
                        <div class="film-details__title-wrap">
                          <h3 class="film-details__title">${title}</h3>
                          <p class="film-details__title-original">Original: ${originalTitle}</p>
                        </div>
  
                        <div class="film-details__rating">
                          <p class="film-details__total-rating">${rating}</p>
                          <p class="film-details__user-rating">${userRatingMarkup}</p>
                        </div>
                      </div>
  
                      <table class="film-details__table">
                        <tr class="film-details__row">
                          <td class="film-details__term">Director</td>
                          <td class="film-details__cell">${director}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Writers</td>
                          <td class="film-details__cell">${writers}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Actors</td>
                          <td class="film-details__cell">${actors}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Release Date</td>
                          <td class="film-details__cell">${filmReleasedDate}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Runtime</td>
                          <td class="film-details__cell">${filmDuration}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Country</td>
                          <td class="film-details__cell">${country}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Genres</td>
                          <td class="film-details__cell">
                          ${filmGenres}
                        </tr>
                      </table>
  
                      <p class="film-details__film-description">
                          ${description}
                      </p>
                    </div>
                  </div>
  
                  <section class="film-details__controls">
                    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
                    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
                    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
                    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
                    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
                    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                  </section>
                </div>

                ${ratedMarkup}
  
                <div class="form-details__bottom-container">
                  <section class="film-details__comments-wrap">
                    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  
                    <ul class="film-details__comments-list">
                    </ul>
  
                    <div class="film-details__new-comment">
                    <div for="add-emoji" class="film-details__add-emoji-label" data-img-src="">
                    ${userEmoji ? `<img class="film-details__added-emoji" src="./images/emoji/${userEmoji}.png" width="55" height="55" alt="emoji">` : ``}
                </div>
  
                      <label class="film-details__comment-label">
                        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                      </label>
  
                      <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                      <label class="film-details__emoji-label" for="emoji-smile">
                        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                      </label>
    
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>
    
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                      <label class="film-details__emoji-label" for="emoji-puke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>
    
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                      </div>
                    </div>
                  </section>
                </div>
              </form>
            </section>`;
};
