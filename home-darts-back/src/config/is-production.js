/** @type {'production' | 'debug'} */
const env = process.argv[2];
if (env !== 'debug' && env !== 'production') throw Error('Env is not specified or specified incorrectly');

module.exports = { isProduction: env === 'production' };
