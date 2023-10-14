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

  /**
   * Creates a method logger that logs messages with the specified method name and logger type.
   * @param method The name of the method to log messages for.
   * @param loggerType The type of logger to use for logging messages.
   * @returns A method logger function that logs messages with the specified method name and logger type.
   */
  createMethodLogger(method: string, loggerType?: LoggerType): MethodLogger {
    return (message?: string, data?: unknown) => {
      log({ sourceID: this.sourceID, method, message, data, loggerType });
    };
  }

  /**
   * Logs a warning message with optional data.
   * @param method - The name of the method that triggered the warning.
   * @param message - The warning message to log.
   * @param data - Optional data to include in the log.
   */
  warn(method: string, message?: string, data?: unknown): void {
    log({ sourceID: this.sourceID, method, message, data, loggerType: 'warn' });
  }

  /**
   * Logs an error message with optional data.
   * @param method - The name of the method where the error occurred.
   * @param message - The error message to log.
   * @param data - Optional data to include in the log.
   */
  error(method: string, message?: string, data?: unknown): void {
    log({ sourceID: this.sourceID, method, message, data, loggerType: 'error' });
  }

  /**
   * Logs a debug message with optional data.
   * @param method - The name of the method being logged.
   * @param message - The message to log.
   * @param data - Optional data to include in the log.
   */
  debug(method: string, message?: string, data?: unknown): void {
    log({ sourceID: this.sourceID, method, message, data, loggerType: 'debug' });
  }

  /**
   * Logs an informational message with optional data.
   * @param method - The name of the method that called this logger.
   * @param message - The message to log.
   * @param data - Optional data to include in the log.
   */
  info(method: string, message?: string, data?: unknown): void {
    log({ sourceID: this.sourceID, method, message, data });
  }
}
