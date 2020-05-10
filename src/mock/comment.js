import { WORDS } from './fish';
import { generateComments, getRandomDate } from './utils';
import { getFormatDate } from '../utils/get-format-date';
import { Range } from '../consts';

export const generateComment = (index) => {

  return {
    id: index,
    author: `Alice Lee`,
    comment: generateComments(Range.MIN_COMMENTS_LENGTH, Range.MAX_COMMENTS_LENGTH, WORDS),
    date: getFormatDate(getRandomDate()),
    emotion: `puke`
  };
};

// date: 2020-05-04T22:23:15.171Z

