import moment from 'moment';

export const getFormatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};
