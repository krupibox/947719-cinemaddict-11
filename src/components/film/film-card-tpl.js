import { DESCRIPTION_MAX_LENGTH } from '../../consts';
import { getTimeFromMins } from '../../utils/get-time-from-mins.js';

export const createFilmCardTemplate = (film) => {
  const {
    title,
    rating,
    year,
    duration,
    genres,
    poster,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorite } = film;

  const ITEM_ACTIVE = `film-card__controls-item--active`;

  const filmYear = new Date(year).getFullYear();
  const filmDuration = getTimeFromMins(duration);  
  const shortDescription = description.length > DESCRIPTION_MAX_LENGTH ?
  `${[...description].slice(0, DESCRIPTION_MAX_LENGTH).join(``) + ` ...`}` : description;
  const filmGenres = [...genres][0] || ``;

  return `<article class="film-card">
              <h3 class="film-card__title">${title}</h3>
              <p class="film-card__rating">${rating}</p>
              <p class="film-card__info">
                <span class="film-card__year">${filmYear}</span>
                <span class="film-card__duration">${filmDuration}</span>
                <span class="film-card__genre">${filmGenres}</span>
              </p>
              <img src="${poster}" alt="" class="film-card__poster">
              <p class="film-card__description">${shortDescription}…</p>
              <a class="film-card__comments">${comments.length} comments</a>
              <form class="film-card__controls">
                <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist && ITEM_ACTIVE}">Add to watchlist</button>
                <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched && ITEM_ACTIVE}">Mark as watched</button>
                <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite && ITEM_ACTIVE}">Mark as favorite</button>
              </form>
            </article>`;
};
