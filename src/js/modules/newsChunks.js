export default class NewsChunks {
  constructor(props) {
    this._props = props;
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
   * Creates and sends a chunk to a common array of chunks,
   * for further retrieval via the getOneChunk method
   * @param  {array} array - array of objects
   */
  generateChunks(array) {
    const { maxItemsPerChunk } = this._props;

    for (let i = 0; i < array.length; i += maxItemsPerChunk) {
      this._chunks.push(array.slice(i, i + maxItemsPerChunk));
    }
  }

  getChunksCount() {
    return this._chunks.length;
  }

  /**
   * Returns the object of the current chunk with the status whether it is the last chunk
   */
  getOneChunk() {
    const isLastChunk = this._currentChunkIndex >= (this._chunks.length - 1);
    const items = this._currentChunkIndex <= (this._chunks.length - 1)
      ? this._chunks[this._currentChunkIndex] : [];

    this._updateChunkIndex();

    return { isLastChunk, items };
  }
}
