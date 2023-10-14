import { LOGGER_TYPE_TO_FUNCTION_MAP } from './logger.const';
import { type LoggerType } from './logger.types';

/**
 * A class for logging messages with optional data.
 */
export class Logger {
  private sourceID: string;

  constructor(sourceID: string) {
    this.sourceID = sourceID;
  }

  /**
   * Logs an informational message with optional data.
   * @param method - The method or function name that is logging the message.
   * @param message - The message to log.
   * @param data - Optional data to include in the log.
   */
  info(method: string, message?: string, data?: unknown) {
    this.log('info', method, message, data);
  }

  private log(loggerType: LoggerType, method: string, message?: string, data?: unknown): void {
    const loggerFunction = LOGGER_TYPE_TO_FUNCTION_MAP[loggerType];
    const formattedMessage = this.formatMessage(method, message);
    if (data) {
      loggerFunction(formattedMessage, data);
    } else {
      loggerFunction(formattedMessage);
    }
  }

  private formatMessage(method: string, message?: string): string {
    return `[${this.sourceID}][${method}]${message ? ' ' + message : ''}`;
  }
}
