import {WORDS} from './fish';
import {generateComments} from './utils';
import {Range} from '../consts';

export const generateComment = (index) => {

  return {
    id: index,
    author: `Alice Lee`,
    comment: generateComments(Range.MIN_COMMENTS_LENGTH, Range.MAX_COMMENTS_LENGTH, WORDS),
    date: `2020-05-04T22:23:15.171Z`,
    emotion: `puke`
  };
};


