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

  deleteComment(comment, indexComment) {        
    const index = this._comments[indexComment].findIndex((it) => it.id === comment.id);
    
    if (index === -1) {
      return false;
    }
    
    this._comments[indexComment] = [].concat(this._comments[indexComment].slice(0, index), comment, this._comments[indexComment].slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
