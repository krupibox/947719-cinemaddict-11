import {getRandomArrayItem, getTextSentenceCase} from './utils';

export const NICKNAMES = [{
  alias: `film lover`,
  rank: 10
},
{
  alias: `film addict`,
  rank: 50
},
{
  alias: `film buff`,
  rank: 100
},
{
  alias: `film geek`,
  rank: 300
},
{
  alias: `film maniac`,
  rank: 500
},
];

export const generateProfile = () => {
  return {
    rating: getTextSentenceCase(getRandomArrayItem(NICKNAMES).alias),
  };
};

