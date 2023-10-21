const express = require('express');
const path = require('path');

const { MICRO_FRONTENDS_FILE_SYSTEM_PATH, MICRO_FRONTENDS_URL_PATH } = require('./index.const');
const { getPortNumber } = require('./index.functions');

const app = express();
const portNumber = getPortNumber();

app.use(MICRO_FRONTENDS_URL_PATH, express.static(path.resolve(process.cwd(), MICRO_FRONTENDS_FILE_SYSTEM_PATH)));

app.listen(portNumber, () => {
  console.log('Micro Frontend Server successfully started');
  console.log(`Micro Frontends available at: http://localhost:${portNumber + MICRO_FRONTENDS_URL_PATH}`);
});
