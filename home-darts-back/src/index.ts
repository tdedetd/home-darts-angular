import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { debugInfo } from './handlers/debug-info.js';
import { isProduction, port } from './config/index.js';
import { router } from './routes/index.js';
import { debugInfoProd } from './handlers/debug-info-prod.js';

const app = express();
// TODO: sql cast number

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (isProduction) {
  app.use(debugInfoProd);
} else {
  app.use(debugInfo);
}
app.use(router);

app.listen(port, () => {
  // TODO: home-darts-back from package.json
  console.info(`home-darts-back listening on port ${port} in ${isProduction ? 'production' : 'debug'} mode`);
});

// TODO: get rid of .js in imports
