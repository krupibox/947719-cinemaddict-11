import CommentAdapter from '../adapters/comment-adapter';

export default class FilmAdapter {
  constructor(serverFilm) {
    this.id = serverFilm[`id`];
    this.poster = serverFilm[`film_info`][`poster`];
    this.title = serverFilm[`film_info`][`title`];
    this.originalTitle = serverFilm[`film_info`][`alternative_title`];
    this.rating = serverFilm[`film_info`][`total_rating`];
    this.ageRating = serverFilm[`film_info`][`age_rating`];
    this.director = serverFilm[`film_info`][`director`] || [];
    this.writers = serverFilm[`film_info`][`writers`] || [];
    this.actors = serverFilm[`film_info`][`actors`] || [];
    this.country = serverFilm[`film_info`][`release`][`release_country`] || [];
    this.year = serverFilm[`film_info`][`release`][`date`] || ``;
    this.duration = serverFilm[`film_info`][`runtime`] || ``;
    this.genres = new Set(serverFilm[`film_info`][`genre`] || []);
    this.description = serverFilm[`film_info`][`description`] || ``;
    this.userRating = serverFilm[`user_details`][`personal_rating`];
    this.watchingDate = new Date(serverFilm[`user_details`][`watching_date`]);
    this.isWatchlist = Boolean(serverFilm[`user_details`][`watchlist`]);
    this.isWatched = Boolean(serverFilm[`user_details`][`already_watched`]);
    this.isFavorite = Boolean(serverFilm[`user_details`][`favorite`]);
    this.comments = [];
  }

  toRAW() {
    return {
      'id': this.id,

      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.originalTitle,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.year.toISOString(),
          'release_country': this.country
        },
        'runtime': this.duration,
        'genre': [...this.genres],
        'description': this.description
      },
      'user_details': {
        'personal_rating': this.userRating,
        'watchlist': this.isWatchlist,
        'already_watched': this.isWatched,
        'watching_date': this.watchingDate,
        'favorite': this.isFavorite
      }
    };
  }

  setComments(comment) {
    this.comments = [...comment];
    return this;
  }

  static parseFilm(serverFilm) {
    return new FilmAdapter(serverFilm);
  }

  static parseFilms(serverFilms) {
    return serverFilms.map(FilmAdapter.parseFilm);
  }

  static cloneFilm(frontFilm) {
    return new FilmAdapter(frontFilm.toRAW());
  }

  static parseFilmWithComments(filmWithComments) {
    const parsedFilm = FilmAdapter.parseFilm(filmWithComments.movie);
    return parsedFilm.setComments(CommentAdapter.parseComments(filmWithComments.comments));
  }
}
