import ProfileComponent from './components/profile/profile';
import NavigationComponent from './components/navigation/navigation';
import FilmsSectionComponent from './components/film-section/film-section';
import FilmsStatisticsComponent from './components/film-statistics/films-statistics';
import PageController from './controllers/page-controller';
import { Films, RenderPosition } from './consts';
import { render } from './utils/render';

import { generateFilm } from './mock/film';
import { generateProfile } from './mock/profile';

const films = [...Array(Films.TOTAL)].map((_, index) => generateFilm(index));

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
const filmsSectionContainer = new FilmsSectionComponent();

render(siteHeader, new ProfileComponent(generateProfile()), RenderPosition.BEFOREEND);
render(siteMain, new NavigationComponent(films), RenderPosition.BEFOREEND);
render(siteMain, filmsSectionContainer, RenderPosition.BEFOREEND);

const filmsSortedByMaxComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);
const pageController = new PageController(filmsSectionContainer, films, filmsSortedByMaxComments);

pageController.render();

render(siteFooter, new FilmsStatisticsComponent(films), RenderPosition.BEFOREEND);
