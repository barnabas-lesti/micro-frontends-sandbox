import { default as moment } from 'moment';

import { LOGGER_TYPE_TO_FUNCTION_MAP } from './logger.const';
import { type LoggerType } from './logger.types';

export class Logger {
  private sourceID: string;

  constructor(sourceID: string) {
    this.sourceID = sourceID;
  }

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
    return `[${moment().format('HH:mm:ss')}][${this.sourceID}][${method}]${message ? ' ' + message : ''}`;
  }
}
