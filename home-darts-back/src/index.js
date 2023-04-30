const { port } = require('./config');

const express = require('express');
const app = express();

app.use(require('cors')());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

const { name: appName } = require('../package.json');
app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});
