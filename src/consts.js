export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const ViewMode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export const Range = {
  MIN_TITLE: 1,
  MAX_TITLE: 3,
  MIN_RATING: 1,
  MAX_RATING: 10,
  MIN_DESCRIPTION: 10,
  MAX_DESCRIPTION: 20,
  MIN_STRING: 1,
  MAX_STRING: 140,
  MIN_COMMENTS_NUMBER: 1,
  MAX_COMMENTS_NUMBER: 5,
  MIN_COMMENTS_LENGTH: 5,
  MAX_COMMENTS_LENGTH: 10,
  MIN_YEAR: 1900,
  MAX_YEAR: 2019,
  MIN_DURATION: 60,
  MAX_DURATION: 90,
  GENRES: 3
};

export const NumberOfFilmsToRender = {
  TOTAL: 17,
  EXTRA: 2,
  START: 5,
  STEP: 5
};

export const FilmCount = {
  START: 5,
  STEP: 5
};

export const SortType = {
  RATING: `rating`,
  DATE: `date`,
  DEFAULT: `default`,
};

export const FILM_CLASS_ELEMENTS = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

export const TypeEmoji = {
  'smile': `smile`,
  'sleeping': `sleeping`,
  'puke': `puke`,
  'angry': `angry`
};

export const FilterTypes = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Stats`
};

export const DisplayMode = {
  SHOW: `show`,
  HIDDEN: `hidden`
};

export const DataDefault= {
  deleteMessage: `Delete`
};

export const DataDeleting = {
  deleteMessage: `Deleting...`
};

export const HandlerLocker = {
  ON: true,
  OFF: false
};

export const UNDO_RATING = 0;

export const SHAKE_TIMEOUT = 700;

export const RATING_NUMBER = 9;

export const KeyCode = {
  ENTER: `Enter`,
  ESCAPE: `Escape`,
  ESC: `Esc`
};

export const StatisticFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const NameRating = {
  DEFAULT: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

export const DESCRIPTION_MAX_LENGTH = 140;

export const AUTHORIZATION = `Basic fjsDjEjdWhdSj2341Sn=`;
export const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

export const Cache = {
  PREFIX: `cinemaaddict-cache`,
  VER: `v1`,
  NAME: `${this.PREFIX}-${this.VER}`
}

export const RESPONSE_SUCCESS = 200;
