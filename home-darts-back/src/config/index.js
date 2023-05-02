const { isProduction } = require('./is-production');

module.exports = {
  isProduction,
  port: 3000,

  /** @type {import('pg').ClientConfig} */
  pg: isProduction ? require('./pg-connect-prod') : require('./pg-connect-dev'),
};
