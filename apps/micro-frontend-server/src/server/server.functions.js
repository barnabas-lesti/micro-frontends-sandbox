const express = require('express');
const path = require('path');

const {
  DEFAULT_PORT_NUMBER,
  PORT_CLI_ARG,
  MICRO_FRONTENDS_FILE_SYSTEM_PATH,
  MICRO_FRONTENDS_URL_PATH,
} = require('./server.const');

function startServer() {
  const app = express();
  const portNumber = getPortNumber();

  app.use(MICRO_FRONTENDS_URL_PATH, express.static(path.resolve(process.cwd(), MICRO_FRONTENDS_FILE_SYSTEM_PATH)));

  app.listen(portNumber, () => {
    console.log('Micro Frontend Server successfully started');
    console.log(`Micro Frontends available at: http://localhost:${portNumber + MICRO_FRONTENDS_URL_PATH}`);
  });
}

function getPortNumber() {
  const portArgIndex = process.argv.indexOf(PORT_CLI_ARG);
  if (portArgIndex !== -1 && process.argv.length > portArgIndex + 1) {
    const portString = process.argv[portArgIndex + 1];
    const portNumber = parseInt(portString, 10);
    return portNumber;
  }

  return DEFAULT_PORT_NUMBER;
}

module.exports = {
  startServer,
};
