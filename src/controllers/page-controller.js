import SortComponent from '../components/sort/sort';
import FilmCardComponent from '../components/film-card/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import NoFilmsComponent from '../components/no-films/no-films';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button';
import {render, isEscPressed} from '../utils';
import {Films, RenderPosition, SortType, FILM_CARD_ELEMENTS} from '../consts';

let CardCount = {
  begin: 5,
  end: 10
};

export default class PageController {
  constructor(container, allFilms, comments) {
    this._container = container;
    this._allFilms = allFilms;
    this._comments = comments;
    this._filmsList = this._container.getFilmsListElement();
    this._filmsListContainer = this._container.getFilmsListContainerElement();
    this._filmsListContainerExtra = this._container.getFilmsListContainerTopRatedElement();
    this._filmsListMostCommented = this._container.getFilmsListContainerMostCommentedElement();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent(this._allFilms);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onSortType = this._onSortType.bind(this);
  }

  render() {

    render(this._container.getElement(), this._sortComponent, RenderPosition.AFTERBEGIN);

    this._sortComponent.setClickHandler(this._onSortType);

    this._renderFilms(this._allFilms);

    if (this._allFilms.length > CardCount.begin) {
      render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    }

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
    this._renderMaxRatingFilms();
    this._renderMostCommentedFilms();
  }

  _renderFilms(films) {
    if (films.length > 0) {
      this._filmsListContainer.innerHTML = ``;

      films.slice(0, CardCount.begin)
        .forEach((_, index) => this._renderFilm(this._filmsListContainer, films[index]));
    } else {
      render(this._filmsListContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    }
  }

  _renderFilm(container, film) {
    const filmCardComponent = new FilmCardComponent(film);
    const filmDetailComponent = new FilmDetailsComponent(film);

    const onFilmCardClick = (evt) => {
      if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {

        const siteMain = document.querySelector(`.main`);
        const oldFilmCard = siteMain.querySelector(`.film-details`);

        if (oldFilmCard) {
          siteMain.replaceChild(filmDetailComponent.getElement(), oldFilmCard);
        }

        render(siteMain, filmDetailComponent, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, onEscapeKeyDown);
      }
    };

    const onCloseButtonClick = () => {
      filmDetailComponent.getElement().remove();
      filmDetailComponent.removeElement();
    };

    const onFilmDetailEsc = () => {
      document.removeEventListener(`keydown`, onEscapeKeyDown);
      filmDetailComponent.getElement().remove();
    };

    const onEscapeKeyDown = () => isEscPressed && onFilmDetailEsc();

    filmCardComponent.setClickHandler(onFilmCardClick);
    filmDetailComponent.setClickHandler(onCloseButtonClick);
    render(container, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderMaxRatingFilms() {
    const filmsMaxRating = this._allFilms.slice().sort((a, b) => b.rating - a.rating);

    if (filmsMaxRating.length > 0) {
      this._allFilms.slice(0, Films.EXTRA).forEach((_, index) => this._renderFilm(this._filmsListContainerExtra, this._comments[index]));
    }

  }

  _renderMostCommentedFilms() {
    if (this._allFilms.length > 0 && this._comments[0].comments.length > 0) {
      this._allFilms.slice(0, Films.EXTRA).forEach((_, index) => this._renderFilm(this._filmsListMostCommented, this._comments[index]));
    }
  }

  _onSortType(sortType) {

    let filmsSorted = this._allFilms.slice();

    switch (sortType) {
      case SortType.DEFAULT:
        filmsSorted = this._allFilms.slice();
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
    this._allFilms.slice(CardCount.begin, CardCount.end).forEach((card) => this._renderFilm(this._filmsListContainer, card));
    let filmsCounter = this._allFilms.slice(CardCount.begin, CardCount.end).length;

    if (CardCount.end < this._allFilms.length) {
      CardCount.begin += filmsCounter;
      CardCount.end += filmsCounter;
    } else {
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
    }
  }
}
