import ProfileComponent from './components/profile/profile';
import FilmsSectionComponent from './components/film-section/film-section';
import FilmsStatisticsComponent from './components/film-statistics/films-statistics';
import FilmsModel from "./models/films.js";
import FilterController from './controllers/filter';
import PageController from './controllers/page';
import { Films, RenderPosition } from './consts';
import { render } from './utils/render';

import { generateFilm } from './mock/film';
import { generateProfile } from './mock/profile';

const films = [...Array(Films.TOTAL)].map((_, index) => generateFilm(index));
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
const siteSection = new FilmsSectionComponent();

render(siteHeader, new ProfileComponent(generateProfile()), RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMain, filmsModel);
// send cb to filterController
// filterController.setOnFilterChange(() => console.log(`filterController.setOnFilterChange`));

// render(this._container.getElement(), this._sortComponent, RenderPosition.BEFOREBEGIN);

filterController.render();

render(siteMain, siteSection, RenderPosition.BEFOREEND);

const pageController = new PageController(siteSection, filmsModel);
pageController.render();

render(siteFooter, new FilmsStatisticsComponent(films), RenderPosition.BEFOREEND);
