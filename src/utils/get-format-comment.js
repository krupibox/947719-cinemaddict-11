import moment from 'moment';

export const getFormatComment = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};
