import FilmComponent from '../components/film/film';
import FilmDetailsComponent from '../components/film-details/film-details';
import {render, replace, remove} from '../utils/render';
import {isEscape} from '../utils/is-escape';
import {RenderPosition, FILM_CLASS_ELEMENTS, ViewMode, TypeEmoji} from '../consts';

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._viewMode = ViewMode.DEFAULT;

    this._film = null;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsContainer = document.body;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);
  }

  render(film) {
    this._film = film;

    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._createFilmComponent();
    this._createFilmDetailsComponent();

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

      return;
    }

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._viewMode !== ViewMode.DEFAULT) {
      remove(this._filmDetailsComponent);
    }
  }

  destroy() {
    remove(this._filmComponent);
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
    this._filmComponent = new FilmComponent(this._film);

    this._filmComponent.setFilmClickHandler((evt) => this._onFilmClick(evt));
    this._filmComponent.setButtonWatchListClickHandler((evt) => this._setOnDataChange(evt, {isWatchlist: !this._film.isWatchlist}));
    this._filmComponent.setButtonWatchedClickHandler((evt) => this._setOnDataChange(evt, {isWatched: !this._film.isWatched}));
    this._filmComponent.setButtonFavoriteClickHandler((evt) => this._setOnDataChange(evt, {isFavorite: !this._film.isFavorite}));
  }

  _createFilmDetailsComponent() {
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    this._filmDetailsComponent.setButtonCloseClickHandler((evt) => this._onCloseButtonClick(evt));

    this._filmDetailsComponent.setButtonWatchListClickHandler((evt) => this._setOnDataChange(evt, {isWatchlist: !this._film.isWatchlist}));
    this._filmDetailsComponent.setButtonWatchedClickHandler((evt) => this._setOnDataChange(evt, {isWatched: !this._film.isWatched}));
    this._filmDetailsComponent.setButtonFavoriteClickHandler((evt) => this._setOnDataChange(evt, {isFavorite: !this._film.isFavorite}));

    this._filmDetailsComponent.setButtonCloseClickHandler((evt) => this._onCloseButtonClick(evt));

    this._filmDetailsComponent.setEmojiClickHandler((evt) => this._onEmojiClickHandler(evt));
  }

  _onFilmClick(evt) {
    evt.preventDefault();

    if (FILM_CLASS_ELEMENTS.some((element) => evt.target.classList.contains(element))) {
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

  _onEmojiClickHandler(evt) {
    evt.preventDefault();

    const emoji = this._filmDetailsComponent.getElement().querySelector(`.film-details__add-emoji-label > img`);
    if (evt.target.parentNode.classList.contains(`film-details__emoji-label`)) {
      const emojiName = evt.target.parentNode.htmlFor;
      emoji.src = TypeEmoji[emojiName];
      emoji.alt = emojiName;
    }
  }

  _onEscapeKeyDown() {
    if (isEscape) {

      this._onViewChange();
      document.removeEventListener(`keydown`, this._onEscapeKeyDown);
      this._viewMode = ViewMode.DEFAULT;
    }
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    remove(this._filmDetailsComponent);
    this._viewMode = ViewMode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscapeKeyDown);
  }
}
