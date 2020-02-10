import './index.css';
import Header from '../../blocks/header/header';
import Results from '../../blocks/results/results';
import Saved from '../../blocks/saved/saved';
import SavedNews from '../../blocks/saved-news/saved-news';
import Auth from '../../js/modules/auth';
import {
  MAIN_API_LINKS, HEADER_ELEMENTS,
  RESULTS_ELEMENTS, CARD_ELEMENTS, SAVED_ELEMENTS, SAVED_PAGE_BLOCKS,
} from '../../js/constants/index';
import {
  formatNewsDate,
  createCardInstance,
} from '../../js/utils';
import MainApi from '../../js/api/MainApi';

const auth = new Auth('saved');
const mainApi = new MainApi(MAIN_API_LINKS);
const header = new Header(
  SAVED_PAGE_BLOCKS.header, HEADER_ELEMENTS, { color: 'dark' },
);
const savedNews = new SavedNews();
const saved = new Saved(SAVED_PAGE_BLOCKS.saved, SAVED_ELEMENTS);
const results = new Results(SAVED_PAGE_BLOCKS.results, RESULTS_ELEMENTS, { page: 'saved' });

results.setDependecies({
  formatNewsDate, createCardInstance, RESULTS_ELEMENTS, auth, mainApi, savedNews, CARD_ELEMENTS,
});
auth.setDependecies({
  mainApi, header, HEADER_ELEMENTS, results, savedNews,
});
savedNews.setDependecies({
  mainApi, auth, results, saved,
});

auth.sendCheckRequest();
