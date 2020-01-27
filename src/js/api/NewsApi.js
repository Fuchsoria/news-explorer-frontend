export default class MainApi {
  constructor(newsApiLink, newsApiParams) {
    this._newsApiLink = newsApiLink;
    this._newsApiParams = newsApiParams;
  }

  getNews(query) {
    const dateTo = '2020-01-26';
    const dateFrom = '2020-01-19';
    return fetch(
      `${this._newsApiLink}q=${query}&from=${dateFrom}&to=${dateTo}&sortBy=${this._newsApiParams.sortBy}&pageSize=${this._newsApiParams.pageSize}&apiKey=${this._newsApiParams.apiKey}`,
    )
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
}
