import {
  getRandomBoolean,
  getRandomIntegerNumber,
  getRandomFloatNumber,
  getRandomArrayItem,
  getRandomGenres,
  generateText,
  generateComments,
  getRandomDate,
  getFormatDate
} from './utils';
import {GENRE, Range} from '../consts';
import {WORDS, POSTERS} from './fish';

const generateCard = (index) => {
  const filmName = generateText(Range.MIN_TITLE, Range.MAX_TITLE, WORDS);

  return {
    id: index,
    title: filmName,
    original: filmName,
    rating: getRandomFloatNumber(Range.MIN_RATING, Range.MAX_RATING),
    year: getRandomIntegerNumber(Range.MIN_YEAR, Range.MAX_YEAR),
    duration: `1h ${getRandomIntegerNumber(Range.MIN_DURATION, Range.MAX_DURATION)}m`,
    genres: getRandomGenres(GENRE),
    poster: getRandomArrayItem(POSTERS),
    description: generateText(Range.MIN_DESCRIPTION, Range.MAX_DESCRIPTION, WORDS),
    age: `12+`,
    isFavorite: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isWatchlistAdded: getRandomBoolean(),
    director: `John Doe`,
    writers: [`John Doe`, `Judy Doe`],
    actors: [`Chevy Chase`, `Dan Aykroyd`, `John Candy`],
    country: `USA`,
    releaseDate: getFormatDate(getRandomDate()),
    comments: generateComments(Range.MIN_COMMENTS, Range.MAX_COMMENTS, WORDS)
  };
};

export {generateCard};