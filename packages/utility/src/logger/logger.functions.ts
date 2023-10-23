import { sanitizeData } from '../utility';
import { LOGGER_TYPE_TO_FUNCTION_MAP } from './logger.const';
import { type LogPayload } from './logger.types';

export function log(payload: LogPayload): void {
  const loggerFunction = LOGGER_TYPE_TO_FUNCTION_MAP[payload.type || 'debug'];
  const formattedMessage = formatMessage(payload.source, payload.message);
  const sanitizedData = sanitizeData(payload.data);
  if (sanitizedData) {
    loggerFunction(formattedMessage, sanitizedData);
  } else {
    loggerFunction(formattedMessage);
  }
}

function formatMessage(source: string[], message?: string): string {
  const sourceString = source.map((sourceItem) => `[${sourceItem}]`).join('');
  return sourceString + (message ? ' ' + message : '');
}
