import { FilmList } from './consts';
import { render } from './utils';
import { createProfileRatingTemplate } from './components/profile';
import { createNavigationTemplate } from './components/navigation';
import { createSortingTemplate } from './components/sorting';
import { createButtonShowMoreTemplate } from './components/button-show-more';
import { createFilmsSectionTemplate } from './components/film-section';
import { createFilmCardTemplate } from './components/film-card';

// uncomment for popup
// import {createFilmDetailsTemplate} from './components/film-details';
import { createMoviesStatistics } from './components/movies-statistics';
import { generateCard } from './mock/card';
import { generateProfile } from './mock/profile';

const films = [...Array(FilmList.TOTAL)].map((_, index) => generateCard(index));

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

render(siteHeader, createProfileRatingTemplate(generateProfile()), `beforeend`);
render(siteMain, createNavigationTemplate(films), `beforeend`);
render(siteMain, createSortingTemplate(films), `beforeend`);
render(siteMain, createFilmsSectionTemplate(), `beforeend`);

const siteFilms = document.querySelector(`.films`);
const siteFilmList = siteFilms.querySelector(`.films-list`);
const siteFilmListContainer = siteFilms.querySelector(`.films-list__container`);
const siteFilmListTopRated = siteFilms.querySelector(`.films .films-list--extra .films-list__container`);
const siteFilmListMostCommented = siteFilms.querySelector(`.films .films-list--extra:last-of-type .films-list__container`);
const siteFilmFooter = document.querySelector(`.footer`);

let beginCardCount = 5;
let endCardCount = 10;

[...Array(beginCardCount)]
  .forEach((_, index) => render(siteFilmListContainer, createFilmCardTemplate(films[index]), `beforeend`)
  );

render(siteFilmList, createButtonShowMoreTemplate(), `beforeend`);

const showMoreButton = siteMain.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`mouseup`, () => {
  films.slice(beginCardCount, endCardCount)
    .forEach((card) => render(siteFilmListContainer, createFilmCardTemplate(card), `beforeend`));

  let filmsCounter = films.slice(beginCardCount, endCardCount).length;

  endCardCount < films.length
    ? (beginCardCount += filmsCounter, endCardCount += filmsCounter)
    : showMoreButton.remove();
});

const filmsMaxRating = films.slice().sort((a, b) => b.rating - a.rating);

if (filmsMaxRating[0].rating > 0) {
  [...Array(FilmList.EXTRA)]
    .forEach((_, index) => render(siteFilmListTopRated, createFilmCardTemplate(filmsMaxRating[index]), `beforeend`));
}

const filmsMaxComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);

if (filmsMaxComments[0].comments.length > 0) {
  [...Array(FilmList.EXTRA)]
    .forEach((_, index) => render(siteFilmListMostCommented, createFilmCardTemplate(filmsMaxComments[index]), `beforeend`));
}

render(siteFilmFooter, createMoviesStatistics(films), `beforeend`);

// uncomment for popup
// render(siteMain, createFilmDetailsTemplate(films[0]), `beforeend`);