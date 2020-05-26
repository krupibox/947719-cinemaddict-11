import moment from 'moment';

export const getTimeFromMins = (mins) => {
  const h = mins / 60 | 0;
  const m = mins % 60 | 0;

  return moment.utc().hours(h).minutes(m).format(`h[h] mm[m] `);
};
