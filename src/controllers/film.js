import FilmComponent from '../components/film/film';
import FilmDetailsComponent from '../components/film-details/film-details';
import CommentComponent from '../components/comment/comment';
import {render, replace, remove} from '../utils/render';
import {isEscape} from '../utils/is-escape';
import {RenderPosition, FILM_CLASS_ELEMENTS, ViewMode, UNDO_RATING, LoadingData} from '../consts';

export default class FilmController {
  constructor(container, onDataChange, onViewChange, onCommentChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onCommentChange = onCommentChange;

    this._onViewChange = onViewChange;
    this._viewMode = ViewMode.DEFAULT;

    this._film = null;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsContainer = document.body;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscapeKeyDown = this._onEscapeKeyDown.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onSendCommentKeyup = this._onSendCommentKeyup.bind(this);
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

    this._filmComponent.setOnFilmClick((evt) => this._onFilmClick(evt));
    this._filmComponent.setOnButtonWatchListClick((evt) => this._setOnDataChange(evt, {isWatchlist: !this._film.isWatchlist}));
    this._filmComponent.setOnButtonWatchedClick((evt) => this._setOnDataChange(evt, {isWatched: !this._film.isWatched}));
    this._filmComponent.setOnButtonFavoriteClick((evt) => this._setOnDataChange(evt, {isFavorite: !this._film.isFavorite}));
  }

  _createFilmDetailsComponent() {
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    this._commentsContainer = this._filmDetailsComponent.getElement()
      .querySelector(`.film-details__comments-list`);
    this._createComments(this._film.comments);

    this._filmDetailsComponent.setOnCloseButtonClick((evt) => this._onCloseButtonClick(evt));
    this._filmDetailsComponent.setOnEscapeKeyDown((evt) => this._onEscapeKeyDown(evt));
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
      this._viewMode = ViewMode.DETAILS;
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

    /**
  *
  * @param {object} this (Instance of FilmController)
  * @param {null} null (Add comment)
  * @param {array} comment (New comment)
  * @param {object} this._film (Current film with data)
  * @memberof PageController
  */

    this._onCommentChange(this, null, comment, this._film);
  }

  _onDeleteButtonClick(comment) {
    comment.setData({deleteButtonText: LoadingData.deleteButtonText});

    // check arguments
    this._onCommentChange(this, comment._filmComment, null, this._film);
  }
}
