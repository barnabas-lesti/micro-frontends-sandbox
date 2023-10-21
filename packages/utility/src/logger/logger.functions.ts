import { sanitizeData } from '../common';
import { LOGGER_TYPE_TO_FUNCTION_MAP } from './logger.const';
import { type LogPayload } from './logger.types';

export function log(payload: LogPayload): void {
  const loggerFunction = LOGGER_TYPE_TO_FUNCTION_MAP[payload.loggerType || 'info'];
  const formattedMessage = formatMessage(payload.sourceID, payload.method, payload.message);
  const sanitizedData = sanitizeData(payload.data);
  if (sanitizedData) {
    loggerFunction(formattedMessage, sanitizedData);
  } else {
    loggerFunction(formattedMessage);
  }
}

function formatMessage(sourceID: string, method: string, message?: string): string {
  return `[${sourceID}][${method}]${message ? ' ' + message : ''}`;
}
