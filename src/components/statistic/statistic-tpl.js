import { getTimeFromMins } from '../../utils/get-time-from-mins';

const calcTopGenre = (films) => {
  const uniqueGenres = [...new Set(films.reduce((acc, { genres }) => [...acc, ...genres], []))];
  return uniqueGenres.reduce((acc, genre) => {
    return films.filter(({ genres }) => [...genres].includes(genre)).length >
      films.filter(({ genres }) => [...genres].includes(acc)).length ? genre : acc;
  });
};

export const getStatisticTemplate = (watchedFilms, userRating) => {
  const watchedFilmsMarkup = watchedFilms ? watchedFilms.length : `0`;
  const totalRuntime = watchedFilms.reduce((acc, film) => acc + film.duration, 0);
  const totalRuntimeMarkup = getTimeFromMins(totalRuntime);
  const topGenreMarkup = watchedFilms.length > 0 ? calcTopGenre(watchedFilms) : `-`;

  return (
    `<section class="statistic visually-hidden">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="./images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRating}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsMarkup} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalRuntimeMarkup ? totalRuntimeMarkup : `0`}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenreMarkup}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
  </section>`
  );
};
