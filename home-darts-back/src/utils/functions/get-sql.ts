const fs = require('fs');
const path = require('path');
const { packageSrcDir } = require('../../config');
const { Cache } = require('../classes/cache');
const { isEmpty } = require('./is-empty');

const sqlCache = new Cache();

/**
 * @param {import('../types/sql-query-name.type').SqlQueryName} queryName
 * @returns {string}
 */
const readSqlFromFile = (queryName) => {
  const sqlPath = path.join(packageSrcDir, 'sql', `${queryName}.sql`);
  return fs.readFileSync(sqlPath, 'utf-8');
};

module.exports = {
  /**
   * @param {import('../types/sql-query-name.type').SqlQueryName} queryName
   * @returns {string}
   */
  getSql: (queryName) => {
    let sql = sqlCache.get(queryName);
    if (isEmpty(sql)) {
      sql = readSqlFromFile(queryName);
      sqlCache.set(queryName, sql);
    }
    return sql;
  }
};

export {};
