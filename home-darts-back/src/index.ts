const { debugInfo } = require('./handlers/debug-info');
const bodyParser = require('body-parser');
const { isProduction, port } = require('./config');
const { name: appName } = require('../package.json');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) app.use(debugInfo);
app.use(require('./routes'));

app.listen(port, () => {
  console.log(`${appName} listening on port ${port} in ${isProduction ? 'production' : 'debug'} mode`);
});

export {};
