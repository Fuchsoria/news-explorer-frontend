import { DATE_MONTHS } from '../constants';

const formatCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month + 1}-${day}`;
};

const formatWeekBeforeDate = () => {
  const date = new Date();
  const timestamp = date.getTime();
  const weekBeforeTimestamp = timestamp - (1000 * 60 * 60 * 24 * 7);
  const weekBeforeDate = new Date(weekBeforeTimestamp);
  const year = weekBeforeDate.getFullYear();
  const month = weekBeforeDate.getMonth();
  const day = weekBeforeDate.getDate();

  return `${year}-${month + 1}-${day}`;
};

const formatNewsDate = (newsDate) => {
  const date = new Date(newsDate);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${DATE_MONTHS[month]}, ${year}`;
};

export {
  formatCurrentDate,
  formatWeekBeforeDate,
  formatNewsDate,
};
