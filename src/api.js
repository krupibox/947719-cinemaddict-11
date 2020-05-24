import FilmModel from './models/film';

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  DELETE: `DELETE`,
  POST: `POST`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(FilmModel.parseFilms)
  }

  getComments(films) {
    return Promise.all(films.map((film) => this._loadComments(film)));
  }

  updateFilm(film) {
    console.log(`updateFilm`, film);
    
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(film.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(FilmModel.parseFilm)
      .then((film) => this._loadComments(film));
  }

  updateComment(controller, comment) {
    return this._load({
      url: `comments/${controller._film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(FilmModel.parseFilmWithComments);
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE
    })
      .then(() => commentId);
  }

  _loadComments(film) {
    return this._load({url: `comments/${film.id}`})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }
  
  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
