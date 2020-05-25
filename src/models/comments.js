export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = comments;

    this._callHandlers(this._dataChangeHandlers);
  }

  addComment(indexComment, comment) {
    this._comments[indexComment].push(comment);
    this._callHandlers(this._dataChangeHandlers);
  }

  deleteComment(deleteComment, indexFilm) {
    // find commets by film index
    const indexComment = this._comments[indexFilm].findIndex((comment) => comment.id === deleteComment.id);

    if (indexComment === -1) {
      return false;
    }

    // delete comment by its comment index
    this._comments[indexFilm] = [].concat(
        this._comments[indexFilm].slice(0, indexComment), this._comments[indexFilm].slice(indexComment + 1)
    );

    this._callHandlers(this._dataChangeHandlers);

    return this._comments[indexFilm];
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
