import { DATE_MONTHS } from '../constants';
import Card from '../../blocks/card/card';

/**
 * Formats the current date in the format necessary for the news api
 */
const formatCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month + 1}-${day}`;
};

/**
 * Formats the date a week ago in the format necessary for the news api
 */
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

/**
 * Formats the date from api to the necessary template standard for output to the user
 * @param  {date} newsDate - Date from news api
 */
const formatNewsDate = (newsDate) => {
  const date = new Date(newsDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${DATE_MONTHS[month]}, ${year}`;
};

/**
 * Creates an instance card and returns it
 * @param  {node} domElement
 * @param  {object} blockElements
 * @param  {object} props
 */
const createCardInstance = (domElement, blockElements, props) => {
  const instance = new Card(domElement, blockElements, props);

  return instance;
};

export {
  formatCurrentDate,
  formatWeekBeforeDate,
  formatNewsDate,
  createCardInstance,
};
