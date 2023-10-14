import { log } from './logger.functions';
import { type LoggerType, type MethodLogger } from './logger.types';

/**
 * A class for logging messages with optional data.
 */
export class Logger {
  private sourceID: string;

  constructor(sourceID: string) {
    this.sourceID = sourceID;
  }

  createMethodLogger(method: string, loggerType?: LoggerType): MethodLogger {
    return (message?: string, data?: unknown) => {
      log({ sourceID: this.sourceID, method, message, data, loggerType });
    };
  }

  warn(method: string, message?: string, data?: unknown): void {
    log({ sourceID: this.sourceID, method, message, data, loggerType: 'warn' });
  }

  error(method: string, message?: string, data?: unknown): void {
    log({ sourceID: this.sourceID, method, message, data, loggerType: 'error' });
  }

  debug(method: string, message?: string, data?: unknown): void {
    log({ sourceID: this.sourceID, method, message, data, loggerType: 'debug' });
  }

  info(method: string, message?: string, data?: unknown): void {
    log({ sourceID: this.sourceID, method, message, data });
  }
}
