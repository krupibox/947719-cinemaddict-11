
export const getRandomWords = (data) => data[Math.floor(Math.random() * data.length)];

export const getRandomIntegerNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomFloatNumber = (min, max) => Math.floor((Math.random() * ((max - min)) + 1) * 10) / 10;

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

export const getRandomArray = (array) => {

  return array.sort(() => Math.random() - 0.5);
};

export const getRandomGenres = (array) => {

  return getRandomArray(array).slice(0, 3);
};

export const getTextSentenceCase = (sentence) => `${sentence[0].toUpperCase()}${sentence.slice(1)}`.trim();

export const getRandomBoolean = () => Math.random() > 0.5;

export const generateText = (min, max, array) => {
  let string = ``;
  new Array(getRandomIntegerNumber(min, max))
    .fill(``)
    .map(() => {
      string += `${getRandomWords(array)} `;
    });

  return getTextSentenceCase(string.substr(Range.MIN_STRING, Range.MAX_STRING));
};

export const generateComments = (min, max, array) => {
  return new Array(getRandomIntegerNumber(min, max))
    .fill(``)
    .map(() => generateText(min, max, array));
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const getFormatDate = (date) => {
  let dd = date.getDate();
  if (dd < 10) {
    dd = `0` + dd;
  }
  let mm = date.toLocaleString(`default`, {month: `long`});

  let yy = date.getFullYear() % 100;
  if (yy < 10) {
    yy = `0` + yy;
  }

  return `${dd} ${mm} ${yy}`;
};
