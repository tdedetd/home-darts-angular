import { ClientConfig } from 'pg';
import { isProduction } from './is-production.js';
import { pgConfigProd } from './pg-connect-prod.js';
import { pgConfigDev } from './pg-connect-dev.js';


export { isProduction } from './is-production.js';

// TODO: resolve !
// TODO: commit
// export const packageSrcDir = dirname(require.main!.filename);
export const packageSrcDir = '';
console.log('packageSrcDir', packageSrcDir);

export const pg: ClientConfig = isProduction ? pgConfigProd : pgConfigDev;

export const port = 3000;

export const maxThrowTimeSeconds = 3 * 60;
