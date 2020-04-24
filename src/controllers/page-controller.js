import SortComponent from '../components/sort/sort';
import NoFilmsComponent from '../components/no-films/no-films';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button';
import FilmController from '../controllers/film-controller';
import { render } from '../utils';
import { Films, RenderPosition, SortType } from '../consts';

const CardCount = {
  BEGIN: 5,
  END: 10
};

export default class PageController {
  constructor(container, allFilms, comments) {
    this._container = container;
    this._films = allFilms;
    this._comments = comments;
    this._filmsList = this._container.getFilmsListElement();
    this._filmsListContainer = this._container.getFilmsListContainerElement();
    this._filmsListContainerExtra = this._container.getFilmsListContainerTopRatedElement();
    this._filmsListMostCommented = this._container.getFilmsListContainerMostCommentedElement();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListContainerExtraController = new FilmController(this._filmsListContainerExtra);
    this._filmsListMostCommentedController = new FilmController(this._filmsListMostCommented);
    this._sortComponent = new SortComponent(this._films);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onSortType = this._onSortType.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  render() {

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

  _onDataChange(filmController, oldFilm, newFilm) {
    const index = this._films.indexOf(oldFilm);

    if (index === -1) {
      return;
    }
    
    this._films[index] = newFilm;
    filmController.render(this._films[index]);
  }

  _renderFilms(films) {
    if (films.length > 0) {
      this._filmsListContainer.innerHTML = ``;

      films.slice(0, CardCount.BEGIN)
        .forEach((_, index) => {

          // _onViewChange
          const filmListContainerController = new FilmController(this._filmsListContainer, this._onDataChange);

          filmListContainerController.render(films[index]);
        });
    } else {
      render(this._filmsListContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    }
  }

  _renderMaxRatingFilms() {
    const filmsMaxRating = this._films.slice().sort((a, b) => b.rating - a.rating);

    if (filmsMaxRating.length > 0) {
      this._films.slice(0, Films.EXTRA)
        .forEach((_, index) => this._filmsListContainerExtraController.render(this._comments[index]));
    }

  }

  _renderMostCommentedFilms() {
    if (this._films.length > 0 && this._comments[0].comments.length > 0) {
      this._films.slice(0, Films.EXTRA)
        .forEach((_, index) => this._filmsListMostCommentedController.render(this._comments[index]));
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

    this._renderFilms(filmsSorted.slice());
  }

  _onShowMoreButtonClick() {
    this._films.slice(CardCount.BEGIN, CardCount.END).forEach((card) => {
      const filmListContainerController = new FilmController(this._filmsListContainer, this._onDataChange);
      filmListContainerController.render(card);
    });

    let filmsCounter = this._films.slice(CardCount.BEGIN, CardCount.END).length;

    if (CardCount.END < this._films.length) {
      CardCount.BEGIN += filmsCounter;
      CardCount.END += filmsCounter;
    } else {
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
    }
  }
}
