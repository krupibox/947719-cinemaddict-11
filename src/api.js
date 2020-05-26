import FilmAdapter from './adapters/film-adapter';
import CommentAdapter from './adapters/comment-adapter';

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

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
 }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(FilmAdapter.parseFilms);
 }

  getComments(films) {
    return Promise.all(films.map((film) => this._loadComments(film)));
 }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(film.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
   })
      .then((response) => response.json())
      .then(FilmAdapter.parseFilm)
      .then((parsedFilm) => this._loadComments(parsedFilm));
 }

  addComment(controller, comment) {
    return this._load({
      url: `comments/${controller._film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
   })
      .then((response) => response.json())
      .then(FilmAdapter.parseFilmWithComments);
 }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE
   })
      .then(() => comment.id);
 }

  _loadComments(film) {
    return this._load({url: `comments/${film.id}`})
      .then((response) => response.json())
      .then(CommentAdapter.parseComments);
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
