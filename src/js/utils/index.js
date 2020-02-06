import { DATE_MONTHS } from '../constants';
import Card from '../../blocks/card/card';

/**
 * Форматирует текущую дату в необходимый для новостного апи формат
 */
const formatCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month + 1}-${day}`;
};

/**
 * Форматирует дату недельной давности в необходимый для новостного апи формат
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
 * Форматирует дату из апи в необходимый шаблонный стандарт для вывода пользователю
 * @param  {date} newsDate - Дата из новостного апи
 */
const formatNewsDate = (newsDate) => {
  const date = new Date(newsDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${DATE_MONTHS[month]}, ${year}`;
};

/**
 * Создаёт инстанц карточки и возвращает его
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
