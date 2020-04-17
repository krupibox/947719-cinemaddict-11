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
const filmsList = filmsSectionComponent.getFilmsListElement();
const filmsListContainer = filmsSectionComponent.getFilmsListContainerElement();
const filmsListContainerExtra = filmsSectionComponent.getFilmsListContainerTopRatedElement();
const filmsListMostCommented = filmsSectionComponent.getFilmsListContainerMostCommentedElement();

render(siteHeader, new ProfileComponent(generateProfile()), RenderPosition.BEFOREEND);
render(siteMain, new NavigationComponent(films), RenderPosition.BEFOREEND);
render(siteMain, new SortingComponent(films), RenderPosition.BEFOREEND);
render(siteMain, filmsSectionComponent, RenderPosition.BEFOREEND);


const renderCard = (container, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailComponent = new FilmDetailsComponent(film);
  
  const onFilmDetailEsc = () => {
    document.removeEventListener(`keydown`, onEscapeKeyDown);
    filmDetailComponent.getElement().remove();
  };
  const onEscapeKeyDown = () => isEscPressed && onFilmDetailEsc();

  const onCloseButtonClick = () => {
    filmDetailComponent.getElement().remove();
    filmDetailComponent.removeElement();
  }

  const onFilmCardClick = (evt) => {
    if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {
      const oldFilmCard = siteMain.querySelector(`.film-details`);

      oldFilmCard
        ? siteMain.replaceChild(filmDetailComponent.getElement(), oldFilmCard)
        : render(siteMain, filmDetailComponent, RenderPosition.BEFOREEND);

      document.addEventListener(`keydown`, onEscapeKeyDown);
    }
  };
  
  filmCardComponent.setClickHandler(onFilmCardClick);
  filmDetailComponent.setClickHandler(onCloseButtonClick);
  render(container, filmCardComponent, RenderPosition.BEFOREEND);
}


let CardCount = {
  begin: 5,
  end: 10
};

(films.length > 0)
  ? films.slice(0, CardCount.begin).forEach((_, index) => renderCard(filmsListContainer, films[index]))
  : render(filmsListContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);


const showMoreButtonComponent = new ShowMoreButtonComponent();

films.length > CardCount.begin && render(filmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);

const onShowMoreButtonClick = () => {
  films.slice(CardCount.begin, CardCount.end).forEach((card) => renderCard(filmsListContainer, card));
  let filmsCounter = films.slice(CardCount.begin, CardCount.end).length;

  if (CardCount.end < films.length) {
    CardCount.begin += filmsCounter;
    CardCount.end += filmsCounter;
  } else {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }
};

showMoreButtonComponent .setClickHandler(onShowMoreButtonClick);


const filmsMaxRating = films.slice().sort((a, b) => b.rating - a.rating);

filmsMaxRating.length > 0
&& films.slice(0, Films.EXTRA).forEach((_, index) => renderCard(filmsListContainerExtra, filmsMaxRating[index]));

const filmsMaxComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);

(films.length > 0 && filmsMaxComments[0].comments.length > 0)
&& films.slice(0, Films.EXTRA).forEach((_, index) => renderCard(filmsListMostCommented, filmsMaxComments[index]));

render(siteFooter, new FilmsStatisticsComponent(films), RenderPosition.BEFOREEND);
