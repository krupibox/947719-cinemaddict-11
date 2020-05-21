export default class Comment {
  constructor(serverFilm) {
    this._id = serverFilm[`id`];
    this._author = serverFilm[`author`];
    this._comment = serverFilm[`comment`];
    this._date = serverFilm[`date`];
    this._emotion = serverFilm[`emotion`];
  }

  toRAW() {
    return {
      'id': this._id,
      'author': this._author,
      'comment': this._comment,
      'date': this._date,
      'emotion': this._emotion
    };
  }

  static parseComment(serverFilm) {
    return new Comment(serverFilm);
  }

  static parseComments(serverFilms) {
    return serverFilms.map(Comment.parseComment);
  }
}
