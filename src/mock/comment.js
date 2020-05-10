import {WORDS} from './fish';
import {generateComments} from './utils';
import {Range} from '../consts';

export const generateComment = (index) => {

  return {
    _id: index,
    _author: `Alice Lee`,
    _comment: generateComments(Range.MIN_COMMENTS_LENGTH, Range.MAX_COMMENTS_LENGTH, WORDS),
    _date: `2020-05-04T22:23:15.171Z`,
    _emotion: `puke`
  };
};


