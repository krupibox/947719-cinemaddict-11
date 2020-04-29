export const getRandomWords = (data) => data[Math.floor(Math.random() * data.length)];
export const getRandomIntegerNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomFloatNumber = (min, max) => Math.floor((Math.random() * ((max - min)) + 1) * 10) / 10;
export const getRandomArray = (array) => array.sort(() => Math.random() - 0.5);
export const getRandomGenres = (array) => getRandomArray(array).slice(0, 3);
export const getTextSentenceCase = (sentence) => `${sentence[0].toUpperCase()}${sentence.slice(1)}`.trim();
export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

export const generateText = (min, max, array) => {
  let string = ``;
  [...Array(getRandomIntegerNumber(min, max))].map(() => {
    string += `${getRandomWords(array)} `;
  });

  return getTextSentenceCase(string.substr(Range.MIN_STRING, Range.MAX_STRING));
};

export const generateComments = (min, max, array) => [...Array(getRandomIntegerNumber(min, max))].map(() => generateText(min, max, array));

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);
  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};
