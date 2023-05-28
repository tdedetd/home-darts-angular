import pg from 'pg';
import { pg as pgConfig } from './index.js';

// TODO: reconnect
// TODO: out from config
const pgPool = new pg.Pool(pgConfig);
const typeTimestamp = 1114;

pg.types.setTypeParser(typeTimestamp, stringValue => new Date(stringValue + '+0000'));

// TODO: rework
let pgClient: pg.PoolClient | null = null;
pgPool.connect().then(client => pgClient = client);

// TODO: rework
export const getPgClient = (): pg.PoolClient => pgClient as pg.PoolClient;
