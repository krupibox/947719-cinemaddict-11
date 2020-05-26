import FilmCardComponent from '../components/film/film-card';
import FilmDetailsComponent from '../components/film-details/film-details';
import CommentComponent from '../components/comment/comment';
import {render, replace, remove} from '../utils/render';
import {isEscape} from '../utils/is-escape';
import {RenderPosition, FILM_CLASS_ELEMENTS, ViewMode, DataDeleting, HandlerLocker} from '../consts';

export default class FilmController {
  constructor(container, onDataChange, onViewChange, onCommentChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentChange = onCommentChange;

    this._isHandlerLocker = HandlerLocker.OFF;
    this._viewMode = ViewMode.DEFAULT;

    this._film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsContainer = document.body;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onSendCommentKeyup = this._onSendCommentKeyup.bind(this);
  }

  render(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._createFilmComponent();
    this._createFilmDetailsComponent();

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      this.setHandlerLocker(HandlerLocker.OFF);

      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

      return;
    }

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._viewMode === ViewMode.DEFAULT) {
      remove(this._filmDetailsComponent);
    }
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  shake() {
    this._filmDetailsComponent.shake();
  }

  blockFilmDetailsForm() {
    this._filmDetailsComponent.disableForm();
  }

  unblockFilmDetailsForm() {
    this._filmDetailsComponent.enableForm();
  }

  setCommentViewDefault() {
    this._showedCommentControllers.forEach((comment) => comment.returnData());
  }

  setHandlerLocker(boolean) {
    this._isHandlerLocker = boolean;
  }

  showOutlineOnError() {
    const inputField = this._filmDetailsComponent.getElementsForBlock().filter((element) => element.classList.contains(`film-details__comment-input`));
    inputField[0].classList.add(`film-details__comment-input--error`);
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
    this._filmCardComponent = new FilmCardComponent(this._film);

    this._filmCardComponent.setOnFilmClick((evt) => this._onFilmClick(evt));
    this._filmCardComponent.setOnButtonWatchListClick((evt) => this._setOnDataChange(evt, {isWatchlist: !this._film.isWatchlist}));
    this._filmCardComponent.setOnButtonWatchedClick((evt) => this._setOnDataChange(evt, {isWatched: !this._film.isWatched}));
    this._filmCardComponent.setOnButtonFavoriteClick((evt) => this._setOnDataChange(evt, {isFavorite: !this._film.isFavorite}));
  }

  _createFilmDetailsComponent() {
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    this._commentsContainer = this._filmDetailsComponent.getElement()
      .querySelector(`.film-details__comments-list`);
    this._createComments(this._film.comments);

    this._filmDetailsComponent.setOnCloseButtonClick(this._onCloseButtonClick);
    this._filmDetailsComponent.setOnEscapeKeyDown(this._onEscapeKeyDown);
    this._filmDetailsComponent.setOnSendCommentPressEnter(this._onSendCommentKeyup);

    this._filmDetailsComponent.setOnButtonWatchListClick((evt) => this._setOnDataChange(evt, {isWatchlist: !this._film.isWatchlist}));
    this._filmDetailsComponent.setOnButtonWatchedClick((evt) => this._setOnDataChange(evt, {isWatched: !this._film.isWatched}));
    this._filmDetailsComponent.setOnButtonFavoriteClick((evt) => this._setOnDataChange(evt, {isFavorite: !this._film.isFavorite}));

    this._filmDetailsComponent.setOnEmojiClick((evt) => this._onEmojiClick(evt));

    this._filmDetailsComponent.setOnChangeRatingFilmClick((rating) => {
      const newFilm = Object.assign({}, this._film, {rating});
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
    }
  }

  _onEmojiClick() {
    this._filmDetailsComponent.rerender();
    this._commentsContainer = this._filmDetailsComponent.getElement()
      .querySelector(`.film-details__comments-list`);
    this._createComments(this._film.comments);

    this._filmDetailsComponent.getElement().scrollTop = document.body.scrollHeight;
  }

  _onEscapeKeyDown(evt) {
    if (isEscape(evt)) {
      this._onViewChange();
      remove(this._filmDetailsComponent);
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
    this._onCommentChange(this, null, comment);
  }

  _onDeleteButtonClick(comment) {
    comment.setData({deleteMessage: DataDeleting.deleteMessage});
    this._onCommentChange(this, comment._filmComment, null);
  }
}
