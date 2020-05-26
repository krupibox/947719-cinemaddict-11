export default class Provider {
    constructor(api, store) {
        this._api = api;
        this._store = store;
    }

    getFilms() {
        // stop here
        this._api.GetFilms().then((films) => {
            films.forEach((film) => this._store.setItem(film.id, film.toRAW()));
            return films;
        });

        const storeFilms = Object.values(this._store.getAll());
        this._isSynchronized = false;

        return Promise.resolve(
            storeFilms.map((film) => Film.parseFilmWithComments({ movie: film, comments: film.comments }))
        );
    }

    updateFilm(film) {
        return this._load({
            url: `movies/${film.id}`,
            method: Method.PUT,
            body: JSON.stringify(film.toRAW()),
            headers: new Headers({ 'Content-Type': `application/json` })
        })
            .then((response) => response.json())
            .then(FilmAdapter.parseFilm)
            .then((film) => this._loadComments(film));
    }

    addComment(controller, comment) {
        return this._load({
            url: `comments/${controller._film.id}`,
            method: Method.POST,
            body: JSON.stringify(comment.toRAW()),
            headers: new Headers({ 'Content-Type': `application/json` })
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
        return this._load({ url: `comments/${film.id}` })
            .then((response) => response.json())
            .then(CommentAdapter.parseComments);
    }

    _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
        headers.append(`Authorization`, this._authorization);

        return fetch(`${this._endPoint}/${url}`, { method, body, headers })
            .then(checkStatus)
            .catch((err) => {
                throw err;
            });
    }
}