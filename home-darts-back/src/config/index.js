const { dirname } = require('path');
const { isProduction } = require('./is-production');

module.exports = {
  isProduction,

  packageSrcDir: dirname(require.main.filename), 

  /** @type {import('pg').ClientConfig} */
  pg: isProduction ? require('./pg-connect-prod') : require('./pg-connect-dev'),

  port: 3000,

  maxThrowTimeSeconds: 3 * 60,
};
