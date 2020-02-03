import './index.css';
import Header from '../../js/components/Header';
import Auth from '../../js/modules/auth';
import NewsCardList from '../../js/components/NewsCardList';
import {
  MAIN_API_LINKS, HEADER_ELEMENTS,
  NEWS_CARD_LIST_ELEMENTS, NEWS_CARD_ELEMENTS,
  SAVEDNEWS_ELEMENTS, SAVED_PAGE_BLOCKS,
} from '../../js/constants/index';
import {
  formatNewsDate,
} from '../../js/utils';
import MainApi from '../../js/api/MainApi';
import NewsCard from '../../js/components/NewsCard';
import SavedNews from '../../js/components/SavedNews';

const auth = new Auth('saved');
const mainApi = new MainApi(MAIN_API_LINKS);
const header = new Header(
  SAVED_PAGE_BLOCKS.header, HEADER_ELEMENTS, { color: 'dark' },
);
const savedNews = new SavedNews(
  SAVED_PAGE_BLOCKS.saved, SAVEDNEWS_ELEMENTS,
);
const newsCardList = new NewsCardList(SAVED_PAGE_BLOCKS.results, NEWS_CARD_LIST_ELEMENTS, { page: 'saved' });

newsCardList.setDependecies({
  formatNewsDate, NewsCard, NEWS_CARD_ELEMENTS, auth, mainApi, savedNews,
});
auth.setDependecies({
  mainApi, header, HEADER_ELEMENTS, newsCardList, savedNews,
});
savedNews.setDependecies({
  SAVEDNEWS_ELEMENTS, mainApi, auth, newsCardList,
});

auth.sendCheckRequest();
