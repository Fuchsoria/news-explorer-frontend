import BaseComponent from './BaseComponent';

export default class NewsChunks extends BaseComponent {
  constructor(...args) {
    super(...args);

    this._chunks = [];
    this._currentChunkIndex = 0;

    this.clearChunks = this.clearChunks.bind(this);
    this.getOneChunk = this.getOneChunk.bind(this);
    this.getChunksCount = this.getChunksCount.bind(this);
  }

  _updateChunkIndex() {
    this._currentChunkIndex += 1;
  }

  clearChunks() {
    this._chunks = [];
    this._currentChunkIndex = 0;
  }

  /**
   * Создаёт и отправляет чанк в общий массив чанков,
   * для дальнейшего получения через метод getOneChunk
   * @param  {array} array - массив объектов
   */
  generateChunks(array) {
    for (let i = 0; i < array.length; i += 3) {
      this._chunks.push(array.slice(i, i + 3));
    }
  }

  getChunksCount() {
    return this._chunks.length;
  }

  /**
   * Возвращает объект текущего чанка со статусом последний ли это чанк
   */
  getOneChunk() {
    const isLastChunk = this._currentChunkIndex >= (this._chunks.length - 1);
    const items = this._currentChunkIndex <= (this._chunks.length - 1)
      ? this._chunks[this._currentChunkIndex] : [];

    this._updateChunkIndex();

    return { isLastChunk, items };
  }
}
