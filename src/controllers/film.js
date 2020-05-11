import FilmComponent from '../components/film/film';
import FilmDetailsComponent from '../components/film-details/film-details';
import CommentComponent from '../components/comment/comment';
import {render, replace, remove} from '../utils/render';
import {isEscape} from '../utils/is-escape';
import {RenderPosition, FILM_CLASS_ELEMENTS, ViewMode, TypeEmoji, UNDO_RATING, LoadingData, HandlerLocker} from '../consts';

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
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
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
    if (this._viewMode === ViewMode.DEFAULT) {
      remove(this._filmDetailsComponent);
    }
  }

  destroy() {
    remove(this._filmComponent);
  }

  blockFilmDetailsForm() {
    this._filmComponent.disableForm();
  }

  unblockFilmDetailsForm() {
    this._filmComponent.enableForm();
  }

  setCommentViewDefault() {
    this._showedCommentControllers.forEach((comment) => comment.returnData());
  }

  setHandlerLocker(boolean) {
    this._isHandlerLocker = boolean;
  }

  resetFilmDetailsForm() {
    this._film.userRating = UNDO_RATING;
    this.render(this._film);
  }

  _setOnDataChange(evt, controlType) {
    evt.preventDefault();
    evt.stopPropagation();

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

    this._commentsContainer = this._filmDetailsComponent.getElement()
    .querySelector(`.film-details__comments-list`);
    this._createComments(this._film.comments);

    this._filmDetailsComponent.setButtonCloseClickHandler((evt) => this._onCloseButtonClick(evt));
    this._filmDetailsComponent.setEscapeKeyDownHandler((evt) => this._onEscapeKeyDown(evt));
    this._filmDetailsComponent.setOnSendCommentPressEnter(this._onSendCommentKeyup);

    this._filmDetailsComponent.setButtonWatchListClickHandler((evt) => this._setOnDataChange(evt, {isWatchlist: !this._film.isWatchlist}));
    this._filmDetailsComponent.setButtonWatchedClickHandler((evt) => this._setOnDataChange(evt, {isWatched: !this._film.isWatched}));
    this._filmDetailsComponent.setButtonFavoriteClickHandler((evt) => this._setOnDataChange(evt, {isFavorite: !this._film.isFavorite}));

    this._filmDetailsComponent.setEmojiClick((evt) => this._onEmojiClick(evt));
    
    this._filmDetailsComponent.setOnChangeRatingFilmClick((rating) => {
      const newFilm = Object.assign({}, this._film, {rating: rating});
      newFilm.userRating = parseInt(rating, 10);
      
        this._onDataChange(this, this._film, newFilm);
    });
  }

  _createComments(comments) {
    this._showedCommentControllers = comments.map((comment) => {
      const commentController = new CommentComponent(comment);

      commentController.setOnDeleteButtonClick(this._onDeleteButtonClick);
      this._renderComments(commentController);

      return commentController;
    });
  }

  _renderComments(comment) {
    render(this._commentsContainer, comment, RenderPosition.BEFOREEND);
  }

  _onDeleteButtonClick(comment) {    
    comment.setData({deleteButtonText: LoadingData.deleteButtonText});
    console.log(comment);
    
    this._onDataChange(this, comment._filmComment.id, null);
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
  
  _onEmojiClick() {
      this._filmComponent.rerender();
      this._commentsContainer = this._filmDetailsComponent.getElement()
        .querySelector(`.film-details__comments-list`);
      this._createComments(this._film.comments);

      this._filmDetailsComponent.getElement().scrollTop = document.body.scrollHeight;
  }

  _onEscapeKeyDown(evt) {
    if (isEscape(evt)) {
      this._onViewChange();
      document.removeEventListener(`keydown`, this._onEscapeKeyDown);
      this._viewMode = ViewMode.DEFAULT;
      this.setDefaultView();
    }
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    remove(this._filmDetailsComponent);
    this._viewMode = ViewMode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscapeKeyDown);
  }

  _onSendCommentKeyup(comment) {
    this._onDataChange(this, null, comment);
  }
}
