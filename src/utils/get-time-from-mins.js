import moment from 'moment';

export const getTimeFromMins = (mins) => {
  let h = mins / 60 | 0;
  let m = mins % 60 | 0;

  return moment.utc().hours(h).minutes(m).format(`h[h] mm[m] `);
};
