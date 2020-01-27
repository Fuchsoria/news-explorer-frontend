const mainApiDomain = 'https://api.news-explorer.info';

const mainApiLinks = {
  signup: `${mainApiDomain}/signup`,
  signin: `${mainApiDomain}/signin`,
  getUserData: `${mainApiDomain}/users/me`,
  getArticles: `${mainApiDomain}/articles`,
  createArticle: `${mainApiDomain}/articles`,
  removeArticle: `${mainApiDomain}/articles`,
};

const newsApiParams = {
  sortBy: 'popularity',
  apiKey: '8059f596a47c4f5b91e73ee4e8a374d9',
  pageSize: 100,
};
const newsApiLink = 'https://newsapi.org/v2/everything?';

export {
  mainApiLinks, mainApiDomain, newsApiParams, newsApiLink,
};
