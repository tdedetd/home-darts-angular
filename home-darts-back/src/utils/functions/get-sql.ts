import { readFileSync } from 'fs';
import { Cache } from '../classes/cache.js';
import path from 'path';
import { packageSrcDir } from '../../config/index.js';
import { isEmpty } from './is-empty.js';
import { SqlQueryName } from '../types/sql-query-name.type.js';

const sqlCache = new Cache();

const readSqlFromFile = (queryName: SqlQueryName): string => {
  const sqlPath = path.join(packageSrcDir, 'sql', `${queryName}.sql`);
  return readFileSync(sqlPath, 'utf-8');
};

export const getSql = (queryName: SqlQueryName): string => {
  let sql = sqlCache.get(queryName) as string;
  if (isEmpty(sql)) {
    sql = readSqlFromFile(queryName);
    sqlCache.set(queryName, sql);
  }
  return sql;
};
