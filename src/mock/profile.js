import {NICKNAMES} from './fish';
import {getRandomArrayItem, getTextSentenceCase} from './utils';

export const generateProfile = () => {
  return {
    rating: getTextSentenceCase(getRandomArrayItem(NICKNAMES).alias),
  };
};

