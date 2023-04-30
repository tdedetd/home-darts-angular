module.exports = {
  port: 3000,

  /** @type {import('pg').ClientConfig} */
  pg: require('./pg-connect'),
};
