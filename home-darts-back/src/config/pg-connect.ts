import pg from 'pg';
import { isProduction, pg as pgConfig } from './index.js';
import { Sequelize } from 'sequelize';

if (
  typeof pgConfig.database !== 'string' ||
  typeof pgConfig.user !== 'string' ||
  typeof pgConfig.password !== 'string'
) {
  throw new Error('Invalid database connection string');
}

// TODO: reconnect
// TODO: out from config
const pgPool = new pg.Pool(pgConfig);
const typeTimestamp = 1114;

pg.types.setTypeParser(typeTimestamp, stringValue => new Date(stringValue + '+0000'));

let pgClient: pg.PoolClient | null = null;
// TODO: make async
pgPool.connect()
  .then(client => pgClient = client)
  .catch(() => console.error('Error occurred while connecting database'));

// TODO: make async
export const getPgClient = (): pg.PoolClient => pgClient as pg.PoolClient;

export const sequelize = new Sequelize(pgConfig.database, pgConfig.user, pgConfig.password, {
  host: pgConfig.host,
  dialect: 'postgres',
  logging: isProduction ? false : console.log,
});
