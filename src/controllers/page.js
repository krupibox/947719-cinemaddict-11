import SortComponent from '../components/sort/sort';
import NoFilmsComponent from '../components/no-films/no-films';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button';
import FilmController from '../controllers/film';
import {render} from '../utils/render';
import {Films, RenderPosition, SortType} from '../consts';

const CardCount = {
  BEGIN: 5,
  END: 10
};

const renderFilms = (filmListElement, films, onDataChange, onViewChange) => films.map((film) => {
  const filmController = new FilmController(filmListElement, onDataChange, onViewChange);

  filmController.render(film);

  return filmController;
});

export default class PageController {
  constructor(container, filmsModel, comments) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._films = this._filmsModel.getFilms();
    this._comments = comments;

    this._filmControllers = [];
    this._showedFilmControllers = [];

    this._filmsList = this._container.getFilmsListElement();
    this._filmsListContainer = this._container.getFilmsListContainerElement();
    this._filmsListContainerExtra = this._container.getFilmsListContainerTopRatedElement();
    this._filmsListMostCommented = this._container.getFilmsListContainerMostCommentedElement();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListContainerExtraController = new FilmController(this._filmsListContainerExtra);
    this._filmsListMostCommentedController = new FilmController(this._filmsListMostCommented);
    this._sortComponent = new SortComponent(this._films);
    this._noFilmsComponent = new NoFilmsComponent();
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onSortType = this._onSortType.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

  }

  render() {

    const films = this._filmsModel.getFilms();

    if (films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }

    render(this._container.getElement(), this._sortComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.setClickHandler(this._onSortType);

    this._renderFilms(this._films);

    if (this._films.length > CardCount.BEGIN) {
      render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    }

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);

    this._renderMaxRatingFilms();
    this._renderMostCommentedFilms();
  }

  _renderFilms(films) {

    if (films.length > 0) {
      const newFilms = renderFilms(
          this._filmsListContainer,
          films.slice(0, CardCount.BEGIN),
          this._onDataChange,
          this._onViewChange
      );

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      return;
    }

  }

  _renderMaxRatingFilms() {
    const filmsMaxRating = this._films.slice().sort((a, b) => b.rating - a.rating);

    if (filmsMaxRating.length > 0) {
      const newFilms = renderFilms(
          this._filmsListContainerExtra,
          filmsMaxRating.slice(0, Films.EXTRA),
          this._onDataChange,
          this._onViewChange
      );

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    }
  }

  _renderMostCommentedFilms() {

    if (this._films.length > 0 && this._comments[0].comments.length > 0) {
      const newFilms = renderFilms(
          this._filmsListMostCommented,
          this._films.slice(0, Films.EXTRA),
          this._onDataChange,
          this._onViewChange
      );

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    }
  }

  _onSortType(sortType) {

    let filmsSorted = this._films.slice();

    switch (sortType) {
      case SortType.DEFAULT:
        filmsSorted = this._films.slice();
        break;
      case SortType.DATE:
        filmsSorted = filmsSorted.sort((a, b) => a.year - b.year);
        break;
      case SortType.RATING:
        filmsSorted = filmsSorted.sort((a, b) => a.rating - b.rating);
        break;
    }

    this._filmsListContainer.innerHTML = ``;
    this._showedFilmControllers = [];
    this._renderFilms(filmsSorted.slice());
  }

  _onShowMoreButtonClick() {

    const newFilms = renderFilms(
        this._filmsListContainer,
        this._films.slice(CardCount.BEGIN, CardCount.END),
        this._onDataChange,
        this._onViewChange
    );

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    let filmsCounter = this._films.slice(CardCount.BEGIN, CardCount.END).length;

    if (CardCount.END < this._films.length) {
      CardCount.BEGIN += filmsCounter;
      CardCount.END += filmsCounter;

      return;
    }

    this._showMoreButtonComponent.getElement().remove();
    this._showMoreButtonComponent.removeElement();
  }

  _onDataChange(filmController, oldFilm, newFilm) {
    const index = this._films.indexOf(oldFilm);

    if (index === -1) {

      return;
    }

    this._films[index] = newFilm;
    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((controller) => controller.setDefaultView());
  }
}
