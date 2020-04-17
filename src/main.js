import ProfileComponent from './components/profile/profile';
import NavigationComponent from './components/navigation/navigation';
import SortingComponent from './components/sorting/sorting';
import ShowMoreButtonComponent from './components/show-more-button/show-more-button';
import FilmsSectionComponent from './components/film-section/film-section';
import FilmCardComponent from './components/film-card/film-card';
import FilmDetailsComponent from './components/film-details/film-details';
import FilmsStatisticsComponent from './components/film-statistics/films-statistics';
import NoFilmsComponent from './components/no-films/no-films';
import { generateCard } from './mock/card';
import { generateProfile } from './mock/profile';

import { Films, RenderPosition, FILM_CARD_ELEMENTS } from './consts';
import { render, isEscPressed } from './utils';

const films = [...Array(Films.TOTAL)].map((_, index) => generateCard(index));

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const filmsSectionComponent = new FilmsSectionComponent();

const filmList = filmsSectionComponent.getElement().querySelector(`.films-list`);
const filmListContainer = filmsSectionComponent.getElement().querySelector(`.films-list__container`);
const filmListTopRated = filmsSectionComponent.getElement().querySelector(`.films .films-list--extra .films-list__container`);
const filmListMostCommented = filmsSectionComponent.getElement().querySelector(`.films .films-list--extra:last-of-type .films-list__container`);

render(siteHeader, new ProfileComponent(generateProfile()), RenderPosition.BEFOREEND);
render(siteMain, new NavigationComponent(films), RenderPosition.BEFOREEND);
render(siteMain, new SortingComponent(films), RenderPosition.BEFOREEND);
render(siteMain, filmsSectionComponent, RenderPosition.BEFOREEND);

const renderCard = (container, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailComponent = new FilmDetailsComponent(film);
  const closeButtonElement = filmDetailComponent.getElement().querySelector(`.film-details__close-btn`);

  render(container, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.getElement().addEventListener(`click`, (event) => {
    if (FILM_CARD_ELEMENTS.some((element) => event.target.classList.contains(element))) {
      const oldFilmCard = siteMain.querySelector(`.film-details`);

      oldFilmCard
        ? siteMain.replaceChild(filmDetailComponent.getElement(), oldFilmCard)
        : render(siteMain, filmDetailComponent, RenderPosition.BEFOREEND);

      document.addEventListener(`keydown`, onEscapeKeyDown);
    }
  });


  const onEscapeKeyDown = () => isEscPressed && closeFilmDetail();
  const closeFilmDetail = () => {
    document.removeEventListener(`keydown`, onEscapeKeyDown);
    filmDetailComponent.getElement().remove();
  };

  closeButtonElement.addEventListener(`click`, () => closeFilmDetail());
};

let CardCount = {
  begin: 5,
  end: 10
};

(films.length > 0)
  ? films.slice(0, CardCount.begin).forEach((_, index) => renderCard(filmListContainer, films[index]))
  : render(filmListContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);

const showMoreButtonComponent = new ShowMoreButtonComponent();

(films.length > CardCount.begin) && render(filmList, showMoreButtonComponent, RenderPosition.BEFOREEND);

showMoreButtonComponent.getElement().addEventListener(`click`, () => {
  films.slice(CardCount.begin, CardCount.end).forEach((card) => renderCard(filmListContainer, card));

  let filmsCounter = films.slice(CardCount.begin, CardCount.end).length;

  if (CardCount.end < films.length) {
    CardCount.begin += filmsCounter;
    CardCount.end += filmsCounter;
  } else {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }

});

const filmsMaxRating = films.slice().sort((a, b) => b.rating - a.rating);

filmsMaxRating.length > 0 &&
  films.slice(0, Films.EXTRA)
    .forEach((_, index) => renderCard(filmListTopRated, filmsMaxRating[index]));

const filmsMaxComments = films.slice().sort((a, b) => b.comments.length - a.comments.length); // as is

(films.length > 0 && filmsMaxComments[0].comments.length > 0) &&
  films.slice(0, Films.EXTRA)
    .forEach((_, index) => renderCard(filmListMostCommented, filmsMaxComments[index]));

render(siteFooter, new FilmsStatisticsComponent(films), RenderPosition.BEFOREEND);
