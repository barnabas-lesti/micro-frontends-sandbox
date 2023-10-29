import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import {
  ASSETS_PATH,
  ASSETS_URL,
  DEFAULT_PORT_NUMBER,
  MICRO_FRONTENDS_PATH,
  MICRO_FRONTENDS_URL,
  PORT_CLI_ARG,
  TRANSLATIONS_PATH,
  TRANSLATIONS_URL,
} from './server.const';

export function startServer(): void {
  log('Starting server...');

  dotenv.config();

  const app = express();
  const portNumber = getPortNumber();

  app.use(cors());

  app.use(MICRO_FRONTENDS_URL, getStaticHandler(MICRO_FRONTENDS_PATH));
  app.use(ASSETS_URL, getStaticHandler(ASSETS_PATH));
  app.use(TRANSLATIONS_URL, getStaticHandler(TRANSLATIONS_PATH));

  app.listen(portNumber, () => {
    const address = `http://localhost:${portNumber}`;
    log(`Server base URL: "${address}"`);
    log(`Micro Frontends URL: "${address + MICRO_FRONTENDS_URL}"`);
    log(`Assets URL: "${address + ASSETS_URL}"`);
    log(`Translations URL: "${address + TRANSLATIONS_URL}"`);
  });
}

function getPortNumber(): number {
  const portArgIndex = process.argv.indexOf(PORT_CLI_ARG);
  if (portArgIndex !== -1 && process.argv.length > portArgIndex + 1) {
    const portString = process.argv[portArgIndex + 1];
    const portNumber = parseInt(portString, 10);
    return portNumber;
  }

  return DEFAULT_PORT_NUMBER;
}

function getStaticHandler(resourcePath: string) {
  return express.static(path.resolve(__dirname, '..', resourcePath));
}

function log(message: string): void {
  console.log(`[Backend] ${message}`);
}
