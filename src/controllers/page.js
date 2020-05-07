import SortComponent from '../components/sort/sort';
import NoFilmsComponent from '../components/no-films/no-films';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button';
import FilmController from '../controllers/film';
import {render, remove} from '../utils/render';
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
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._filmControllers = [];
    this._showedFilmControllers = [];

    this._filmsList = this._container.getFilmsListElement();
    this._filmsListContainer = this._container.getFilmsListContainerElement();
    this._filmsListContainerExtra = this._container.getFilmsListContainerTopRatedElement();
    this._filmsListMostCommented = this._container.getFilmsListContainerMostCommentedElement();

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListContainerExtraController = new FilmController(this._filmsListContainerExtra);
    this._filmsListMostCommentedController = new FilmController(this._filmsListMostCommented);
    this._sortComponent = new SortComponent(this._filmsModel.getFilms());
    this._noFilmsComponent = new NoFilmsComponent();

    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setOnDataChange(this._onFilterChange);
    this._sortComponent.setClickHandler(this._onSortChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    if (films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
    }

    render(this._container.getElement(), this._sortComponent, RenderPosition.AFTERBEGIN);

    this._renderFilms(CardCount.BEGIN, films);
    this._renderShowMoreButton(films);
    this._renderMaxRatingFilms();
    this._renderMostCommentedFilms();
  }

  _renderFilms(count, films) {
    if (films && films.length > 0) {
      const newFilms = renderFilms(
          this._filmsListContainer,
          films.slice(0, count),
          this._onDataChange,
          this._onViewChange
      );

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      return;
    }
  }

  _renderShowMoreButton(films) {
    if (films.length > CardCount.BEGIN) {
      render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    }

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _renderMaxRatingFilms() {
    const films = this._filmsModel.getFilms();
    const filmsMaxRating = films.slice().sort((a, b) => b.rating - a.rating);

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
    const films = this._filmsModel.getFilms();
    const filmsMaxComments = films.sort((a, b) => Math.sign(b.comments.length - a.comments.length));

    if (filmsMaxComments[0].comments.length > 0) {
      const newFilms = renderFilms(
          this._filmsListMostCommented,
          films.slice(0, Films.EXTRA),
          this._onDataChange,
          this._onViewChange
      );

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    }
  }

  _updateFilms(count, updatedFilms = this._filmsModel.getFilms()) {
    this._removeFilms();
    this._renderFilms(count, updatedFilms);
    this._renderShowMoreButton(updatedFilms);
    this._renderMostCommentedFilms();
    this._renderMaxRatingFilms();
  }

  _removeFilms() {
    this._filmsListContainer.innerHTML = ``;
    this._showedFilmControllers = [];
  }

  _onShowMoreButtonClick() {
    const films = this._filmsModel.getFilms();

    const newFilms = renderFilms(
        this._filmsListContainer,
        films.slice(CardCount.BEGIN, CardCount.END),
        this._onDataChange,
        this._onViewChange
    );

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    let filmsCounter = films.slice(CardCount.BEGIN, CardCount.END).length;

    if (CardCount.END < films.length) {
      CardCount.BEGIN += filmsCounter;
      CardCount.END += filmsCounter;

      return;
    }

    remove(this._showMoreButtonComponent);
  }

  _onDataChange(filmController, oldFilm, newFilm) {
    const isSuccess = this._filmsModel.updateFilm(oldFilm.id, newFilm);

    if (isSuccess) {
      filmController.render(newFilm);
    }
  }

  _onFilterChange() {
    this._updateFilms(CardCount.BEGIN);
    this._sortComponent.setDefaultView();
  }

  _onSortChange(sortType) {
    let filmsSorted = this._filmsModel.getFilms();

    switch (sortType) {
      case SortType.DEFAULT:
        filmsSorted = filmsSorted;
        break;
      case SortType.DATE:
        filmsSorted = filmsSorted.sort((a, b) => a.year - b.year);
        break;
      case SortType.RATING:
        filmsSorted = filmsSorted.sort((a, b) => a.rating - b.rating);
        break;
    }

    this._removeFilms();
    this._renderFilms(CardCount.BEGIN, filmsSorted.slice());
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((controller) => controller.setDefaultView());
  }
}
