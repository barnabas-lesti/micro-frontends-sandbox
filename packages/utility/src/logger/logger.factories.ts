import { Logger } from './logger.class';

export function createLogger(sourceID: string) {
  return new Logger(sourceID);
}
