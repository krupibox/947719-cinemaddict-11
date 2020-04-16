import {
  NICKNAMES
} from './fish';

import {
  getRandomArrayItem,
  getTextSentenceCase
} from '../utils';

const generateProfile = () => {
  return {
    rating: getTextSentenceCase(getRandomArrayItem(NICKNAMES).alias),
  };
};

export {
  generateProfile
};
