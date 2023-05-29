import { ClientConfig } from 'pg';
import { isProduction } from './is-production.js';
import { config as pgConfigProd } from './pg-connect-prod.js';
import { config as pgConfigDev } from './pg-connect-dev.js';

export { isProduction } from './is-production.js';

export const packageSrcDir = process.cwd();

export const pg: ClientConfig = isProduction ? pgConfigProd : pgConfigDev;

export const port = 3000;

export const maxThrowTimeSeconds = 3 * 60;
