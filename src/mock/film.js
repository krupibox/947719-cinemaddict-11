import {
  getRandomBoolean,
  getRandomIntegerNumber,
  getRandomFloatNumber,
  getRandomArrayItem,
  getRandomGenres,
  generateText,
  generateComments,
  getRandomDate
} from './utils';

import {getFormatDate} from '../utils/get-format-date';
import {getTimeFromMins} from '../utils/get-time-from-mins';

import {
  GENRE,
  Range
} from '../consts';

import {
  WORDS,
  POSTERS
} from './fish';

export const generateFilm = (index) => {
  const filmName = generateText(Range.MIN_TITLE, Range.MAX_TITLE, WORDS);

  return {
    id: index,
    title: filmName,
    original: filmName,
    rating: getRandomFloatNumber(Range.MIN_RATING, Range.MAX_RATING),
    year: getRandomIntegerNumber(Range.MIN_YEAR, Range.MAX_YEAR),
    duration: getTimeFromMins(getRandomIntegerNumber(Range.MIN_DURATION, Range.MAX_DURATION)),
    genres: getRandomGenres(GENRE),
    poster: getRandomArrayItem(POSTERS),
    description: generateText(Range.MIN_DESCRIPTION, Range.MAX_DESCRIPTION, WORDS),
    age: `12+`,
    isWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    director: `John Doe`,
    writers: [`John Doe`, `Judy Doe`],
    actors: [`Chevy Chase`, `Dan Aykroyd`, `John Candy`],
    country: `USA`,
    releaseDate: getFormatDate(getRandomDate()),
    comments: generateComments(Range.MIN_COMMENTS, Range.MAX_COMMENTS, WORDS)
  };
};
