const { Pool: PgPool } = require('pg');
const pgPool = new PgPool(require('../config').pg);

/** @type {import('pg').PoolClient} */
let pgClient = null;
pgPool.connect().then(client => pgClient = client);

module.exports = {
  /**
   * @returns {import('pg').PoolClient}
   */
  getPgClient: () => pgClient,
};
