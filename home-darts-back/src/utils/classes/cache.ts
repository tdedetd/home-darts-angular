class Cache {
  _cache = {};

  /**
   * @param {string} key 
   * @returns {string | undefined}
   */
  get(key) {
    return this._cache[key];
  }

  /**
   * @param {string} key 
   * @param {string} value 
   * @returns {void}
   */
  set(key, value) {
    this._cache[key] = value;
  }
}

module.exports = { Cache };

export {};
