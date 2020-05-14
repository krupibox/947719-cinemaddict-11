import ProfileComponent from './components/profile/profile';
import FilmsSectionComponent from './components/film-section/film-section';
import FilmsStatisticsComponent from './components/film-statistics/films-statistics';
import FilmsModel from "./models/films.js";
import CommentsModel from "./models/comments.js";
import FilterController from './controllers/filter';
import PageController from './controllers/page';
import { NumberOfFilmsToRender, RenderPosition } from './consts';
import { render } from './utils/render';

import { generateFilm } from './mock/film';
import { generateComment } from './mock/comment';
import { generateProfile } from './mock/profile';
import { getRandomIntegerNumber } from './mock/utils';

const films = [...Array(NumberOfFilmsToRender.TOTAL)]
.map(() => generateFilm());

const comments = [...Array(NumberOfFilmsToRender.TOTAL)]
.map(() => [...Array(getRandomIntegerNumber(1, 5))]
.map(() => generateComment()));

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
const siteSection = new FilmsSectionComponent();

render(siteHeader, new ProfileComponent(generateProfile()), RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMain, filmsModel);
filterController.render();

render(siteMain, siteSection, RenderPosition.BEFOREEND);

const pageController = new PageController(
    siteSection,
    filmsModel,
    commentsModel);

pageController.render();

render(siteFooter, new FilmsStatisticsComponent(films), RenderPosition.BEFOREEND);
