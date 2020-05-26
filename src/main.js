import ProfileComponent from './components/profile/profile';
import FilmsSectionComponent from './components/films-section/films-section';
import FilmsStatisticsComponent from './components/films-statistics/films-statistics';
import StatisticsComponent from './components/statistic/statistic';
import FilterController from './controllers/filter';
import PageController from './controllers/page';
import FilmsModel from "./models/films";
import CommentsModel from "./models/comments";
import {RenderPosition, AUTHORIZATION, END_POINT} from './consts';
import {render} from './utils/render';
import Api from "./api";

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const api = new Api(END_POINT, AUTHORIZATION);

api.getFilms()
    .then((films) => {
      filmsModel.setFilms(films);
      api.getComments(films)
            .then((comments) => {
              commentsModel.setComments(comments);

              const profileComponent = new ProfileComponent(filmsModel.getFilmsAll());

              filmsModel.setOnDataChange(() => {
                profileComponent.rerender(filmsModel.getFilmsAll());
              });

              render(siteHeader, profileComponent, RenderPosition.BEFOREEND);

              const siteSection = new FilmsSectionComponent();
              const statisticComponent = new StatisticsComponent(filmsModel.getFilmsAll());

              const filterController = new FilterController(siteMain, siteSection, filmsModel, statisticComponent);
              filterController.render();

              render(siteMain, siteSection, RenderPosition.BEFOREEND);

              const pageController = new PageController(siteSection, filmsModel, commentsModel, api);
              pageController.render();

              render(siteMain, statisticComponent, RenderPosition.BEFOREEND);
              render(siteFooter, new FilmsStatisticsComponent(films), RenderPosition.BEFOREEND);
            });
    });

