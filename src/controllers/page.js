import SortComponent from '../components/sort/sort';
import NoFilmsComponent from '../components/no-films/no-films';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button';
import FilmController from '../controllers/film';
import {render, remove} from '../utils/render';
import {NumberOfFilmsToRender, FilmCount, RenderPosition, SortType} from '../consts';

const renderFilms = (films, filmListElement, onDataChange, onViewChange) => films.map((film) => {
  const filmController = new FilmController(filmListElement, onDataChange, onViewChange);
  filmController.render(film);

  return filmController;
});

export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showedFilmControllers = [];
    this._showedMaxRatingFilmControllers = [];
    this._showedMostCommentedFilmControllers = [];

    this._filmsList = this._container.getFilmsListElement();
    this._filmsListContainer = this._container.getFilmsListContainerElement();
    this._filmsListContainerTopRated = this._container.getFilmsListContainerTopRatedElement();
    this._filmsListContainerMostCommented = this._container.getFilmsListContainerMostCommentedElement();

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent(this._filmsModel.getFilms());
    this._noFilmsComponent = new NoFilmsComponent();

    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setOnDataChange(this._onFilterChange);
    this._sortComponent.setClickHandler(this._onSortChange);

    this._showingFilmCount = FilmCount.START;
  }

  render() {
    const films = this._filmsModel.getFilms();

    if (films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }

    render(this._container.getElement(), this._sortComponent, RenderPosition.AFTERBEGIN);

    this._updateFilms(this._showingFilmCount, films);
  }

  _renderFilms(count, films) {
    const newFilms = renderFilms(
        films.slice(0, count),
        this._filmsListContainer,
        this._onDataChange,
        this._onViewChange
    );

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmCount = this._showedFilmControllers.length;
  }

  _renderShowMoreButton(films) {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmCount >= films.length) {
      return;
    }

    render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }


  sortFilmsByMaxRating(films) {
    const sortedFilms = films.slice().sort((a, b) => b.rating - a.rating)
      .slice(0, NumberOfFilmsToRender.EXTRA);

    const total = sortedFilms.reduce((accum, item) => accum + item.rating, 0);

    return total === 0 ? null : sortedFilms;
  }

  _renderMaxRatingFilms() {
    const sortedFilms = this.sortFilmsByMaxRating(this._filmsModel.getFilms());

    if (sortedFilms === null) {
      this._showedMaxRatingFilmControllers.forEach((controller) => controller.destroy());
      this._showedMaxRatingFilmControllers = [];
      return;
    }

    const newFilms = renderFilms(
        sortedFilms,
        this._filmsListContainerTopRated,
        this._onDataChange,
        this._onViewChange
    );

    this._showedMaxRatingFilmControllers = [].concat(newFilms);
  }


  sortFilmsByMostComments(films) {
    const sortedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, NumberOfFilmsToRender.EXTRA);

    const total = sortedFilms.reduce((accum, item) => accum + item.comments.length, 0);

    return total === 0 ? null : sortedFilms;
  }

  _renderMostCommentedFilms() {
    const sortedFilms = this.sortFilmsByMostComments(this._filmsModel.getFilms());

    if (sortedFilms === null) {
      this._showedMostCommentedFilmControllers.forEach((controller) => controller.destroy());
      this._showedMostCommentedFilmControllers = [];
      return;
    }

    const newFilms = renderFilms(
        sortedFilms,
        this._filmsListContainerMostCommented,
        this._onDataChange,
        this._onViewChange
    );

    this._showedMostCommentedFilmControllers = [].concat(newFilms);
  }

  _updateFilms(count, updatedFilms = this._filmsModel.getFilms()) {
    this._removeFilms();
    this._renderFilms(count, updatedFilms);
    this._renderShowMoreButton(updatedFilms);
    this._renderMaxRatingFilms();
    this._renderMostCommentedFilms();
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((controller) => controller.destroy());
    this._showedMaxRatingFilmControllers.forEach((controller) => controller.destroy());
    this._showedMostCommentedFilmControllers.forEach((controller) => controller.destroy());
    this._showedFilmControllers = [];
    this._showedMaxRatingFilmControllers = [];
    this._showedMostCommentedFilmControllers = [];
  }

  _onShowMoreButtonClick() {
    const films = this._filmsModel.getFilms();

    const prevFilmCount = this._showingFilmCount;
    this._showingFilmCount = prevFilmCount + FilmCount.STEP;

    this._updateFilms(this._showingFilmCount, films);
  }

  _onDataChange(filmController, oldFilm, newFilm) {
    this._filmsModel.updateFilm(oldFilm.id, newFilm);
    filmController.render(newFilm);
  }

  _onFilterChange() {
    this._updateFilms(FilmCount.START);
    this._sortComponent.setDefaultView();
  }

  _onSortChange(sortType) {
    let filmsSorted = this._filmsModel.getFilms();

    switch (sortType) {
      case SortType.DEFAULT:
        filmsSorted = filmsSorted;
        break;
      case SortType.DATE:
        filmsSorted = filmsSorted.slice().sort((a, b) => a.year - b.year);
        break;
      case SortType.RATING:
        filmsSorted = filmsSorted.slice().sort((a, b) => a.rating - b.rating);
        break;
    }

    this._updateFilms(this._showingFilmCount, filmsSorted);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((controller) => controller.setDefaultView());
  }
}
