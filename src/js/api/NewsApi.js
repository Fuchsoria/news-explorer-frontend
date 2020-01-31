export default class NewsApi {
  constructor(newsApiLink, newsApiParams, newsApiDependecies) {
    this._apiLink = newsApiLink;
    this._apiParams = newsApiParams;
    this._apiDependecies = newsApiDependecies;
  }

  getNews(query) {
    const { sortBy, pageSize, apiKey } = this._apiParams;
    const { formatCurrentDate, formatWeekBeforeDate } = this._apiDependecies;
    const dateTo = formatCurrentDate();
    const dateFrom = formatWeekBeforeDate();

    return fetch(
      `${this._apiLink}q=${query}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`,
    )
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
}
