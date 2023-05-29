const env: string | 'production' | 'debug' = process.argv[2];
if (env !== 'debug' && env !== 'production') throw Error('Env is not specified or specified incorrectly');
export const isProduction = env === 'production';
