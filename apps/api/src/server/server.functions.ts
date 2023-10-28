import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import {
  DEFAULT_PORT_NUMBER,
  MICRO_FRONTENDS_FILE_SYSTEM_PATH,
  MICRO_FRONTENDS_URL_PATH,
  PORT_CLI_ARG,
} from './server.const';

export function getPortNumber(): number {
  const portArgIndex = process.argv.indexOf(PORT_CLI_ARG);
  if (portArgIndex !== -1 && process.argv.length > portArgIndex + 1) {
    const portString = process.argv[portArgIndex + 1];
    const portNumber = parseInt(portString, 10);
    return portNumber;
  }

  return DEFAULT_PORT_NUMBER;
}

export function startServer(): void {
  dotenv.config();

  const app = express();
  const portNumber = getPortNumber();

  app.use(MICRO_FRONTENDS_URL_PATH, express.static(path.resolve(process.cwd(), MICRO_FRONTENDS_FILE_SYSTEM_PATH)));

  app.listen(portNumber, () => {
    console.log(`API server started at: "http://localhost:${portNumber}"`);
    console.log(`Micro Frontends available at: "${MICRO_FRONTENDS_URL_PATH}"`);
  });
}
