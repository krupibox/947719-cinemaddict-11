import FilmCardComponent from '../components/film-card/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import NoFilmsComponent from '../components/no-films/no-films';
import ShowMoreButtonComponent from '../components/show-more-button/show-more-button';
import {render, isEscPressed} from '../utils';
import {Films, RenderPosition, FILM_CARD_ELEMENTS} from '../consts';

let CardCount = {
  begin: 5,
  end: 10
};

export default class PageController {
  constructor(container, allFilms, comments) {
    this.container = container;
    this.allFilms = allFilms;
    this.comments = comments;
    this.filmsList = this.container.getFilmsListElement();
    this.filmsListContainer = this.container.getFilmsListContainerElement();
    this.filmsListContainerExtra = this.container.getFilmsListContainerTopRatedElement();
    this.filmsListMostCommented = this.container.getFilmsListContainerMostCommentedElement();
    this.showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render() {
    if (this.allFilms.length > 0) {
      this.allFilms.slice(0, CardCount.begin)
        .forEach((_, index) => this._renderFilm(this.filmsListContainer, this.allFilms[index]));
    } else {
      render(this.filmsListContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    }

    if (this.allFilms.length > CardCount.begin) {
      render(this.filmsList, this.showMoreButtonComponent, RenderPosition.BEFOREEND);
    }

    const onShowMoreButtonClick = () => {
      this.allFilms.slice(CardCount.begin, CardCount.end).forEach((card) => this._renderFilm(this.filmsListContainer, card));
      let filmsCounter = this.allFilms.slice(CardCount.begin, CardCount.end).length;

      if (CardCount.end < this.allFilms.length) {
        CardCount.begin += filmsCounter;
        CardCount.end += filmsCounter;
      } else {
        this.showMoreButtonComponent.getElement().remove();
        this.showMoreButtonComponent.removeElement();
      }
    };

    this.showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
    this._renderMaxRatingFilms();
    this._renderMostCommentedFilms();
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
    const filmsMaxRating = this.allFilms.slice().sort((a, b) => b.rating - a.rating);

    if (filmsMaxRating.length > 0) {
      this.allFilms.slice(0, Films.EXTRA).forEach((_, index) => this._renderFilm(this.filmsListContainerExtra, this.comments[index]));
    }

  }
  _renderMostCommentedFilms() {
    if (this.allFilms.length > 0 && this.comments[0].comments.length > 0) {
      this.allFilms.slice(0, Films.EXTRA).forEach((_, index) => this._renderFilm(this.filmsListMostCommented, this.comments[index]));
    }
  }
}
