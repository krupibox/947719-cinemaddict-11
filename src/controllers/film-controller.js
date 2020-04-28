import FilmCardComponent from '../components/film-card/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import {render, replace} from '../utils/render';
import {RenderPosition, FILM_CARD_ELEMENTS, ViewMode} from '../consts';
import {isEscPressed} from '../utils/utils';

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._viewMode = ViewMode.DEFAULT;

    this._film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsContainer = document.body;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onFilmDetailsEsc = this._onFilmDetailsEsc.bind(this);
    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);
  }

  render(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._createFilmComponent();
    this._createFilmDetailsComponent();

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

      return;
    }

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._viewMode !== ViewMode.DEFAULT) {
      this._filmDetailsComponent.getElement().remove();
      this._filmDetailsComponent.removeElement();
    }
  }

  _setOnDataChange(evt, controlType) {
    evt.preventDefault();

    this._onDataChange(
        this,
        this._film,
        Object.assign({}, this._film, controlType)
    );
  }

  _createFilmComponent() {
    this._filmCardComponent = new FilmCardComponent(this._film);

    this._filmCardComponent.setCardClickHandler((evt) => this._onFilmCardClick(evt));
    this._filmCardComponent.setButtonWatchListClickHandler((evt) => this._setOnDataChange(evt, {isWatchlist: !this._film.isWatchlist}));
    this._filmCardComponent.setButtonWatchedClickHandler((evt) => this._setOnDataChange(evt, {isWatched: !this._film.isWatched}));
    this._filmCardComponent.setButtonFavoriteClickHandler((evt) => this._setOnDataChange(evt, {isFavorite: !this._film.isFavorite}));
  }

  _createFilmDetailsComponent() {
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    this._filmDetailsComponent.setButtonCloseClickHandler((evt) => this._onCloseButtonClick(evt));

    this._filmDetailsComponent.setButtonWatchListClickHandler((evt) => this._setOnDataChange(evt, {isWatchlist: !this._film.isWatchlist}));
    this._filmDetailsComponent.setButtonWatchedClickHandler((evt) => this._setOnDataChange(evt, {isWatched: !this._film.isWatched}));
    this._filmDetailsComponent.setButtonFavoriteClickHandler((evt) => this._setOnDataChange(evt, {isFavorite: !this._film.isFavorite}));
  }

  _onFilmCardClick(evt) {
    evt.preventDefault();

    if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {

      if (this._viewMode === ViewMode.DETAILS) {

        return;
      }

      this._onViewChange();
      this._createFilmDetailsComponent();
      render(this._filmDetailsContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);

      document.addEventListener(`keydown`, this._onEscapeKeyDown);

      this._viewMode = ViewMode.DETAILS;
    }
  }

  _onEscapeKeyDown() {
    return isEscPressed && this._onFilmDetailsEsc();
  }

  _onFilmDetailsEsc() {
    document.removeEventListener(`keydown`, this._onEscapeKeyDown);
    this._onViewChange();
    this._viewMode = ViewMode.DEFAULT;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this._filmDetailsComponent.getElement().remove();
    this._filmDetailsComponent.removeElement();
    this._viewMode = ViewMode.DEFAULT;
    document.removeEventListener(`keydown`, this._onFilmDetailsEsc);
  }
}
