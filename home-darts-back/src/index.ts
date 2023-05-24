import bodyParser from 'body-parser';
import cors from 'cors';
import { debugInfo } from './handlers/debug-info.js';
import express from 'express';
import { isProduction, port } from './config/index.js';
import { router } from './routes/index.js';

const { name: appName } = require('../package.json');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) app.use(debugInfo);
app.use(router);

app.listen(port, () => {
  console.log(`${appName} listening on port ${port} in ${isProduction ? 'production' : 'debug'} mode`);
});
