// TODO: reconnect
const { Pool: PgPool, types: pgTypes } = require('pg');
const pgPool = new PgPool(require('../config').pg);
const typeTimestamp = 1114;

pgTypes.setTypeParser(typeTimestamp, stringValue => new Date(stringValue + '+0000'));

/** @type {import('pg').PoolClient} */
let pgClient = null;
pgPool.connect().then(client => pgClient = client);

module.exports = {
  /** @returns {import('pg').PoolClient} */
  getPgClient: () => pgClient,
};
