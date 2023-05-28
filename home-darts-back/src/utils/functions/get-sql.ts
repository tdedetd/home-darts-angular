import { readFileSync } from 'fs';
import { Cache } from '../classes/cache.js';
import path from 'path';
import { packageSrcDir } from '../../config/index.js';
import { isEmpty } from './is-empty.js';
import { SqlQueries } from '../types/sql-queries.enum.js';

const sqlCache = new Cache<SqlQueries, string>();

const readSqlFromFile = (queryName: SqlQueries): string => {
  const sqlPath = path.join(packageSrcDir, 'src', 'sql', `${queryName}.sql`);
  return readFileSync(sqlPath, 'utf-8');
};

export const getSql = (queryName: SqlQueries): string => {
  let sql = sqlCache.get(queryName);
  if (isEmpty(sql)) {
    sql = readSqlFromFile(queryName);
    sqlCache.set(queryName, sql);
  }
  // TODO: throw SqlFileReadError instead as string
  return sql as string;
};
