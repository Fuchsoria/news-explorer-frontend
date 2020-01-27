export default class NewsApi {
  constructor(newsApiLink, newsApiParams) {
    this._newsApiLink = newsApiLink;
    this._newsApiParams = newsApiParams;
  }

  getNews(query) {
    const { sortBy, pageSize, apiKey } = this._newsApiParams;
    const dateTo = '2020-01-26';
    const dateFrom = '2020-01-19';

    return fetch(
      `${this._newsApiLink}q=${query}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`,
    )
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
}
