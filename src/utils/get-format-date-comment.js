import moment from 'moment';

export const getFormatDateComment = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};
