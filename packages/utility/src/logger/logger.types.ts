import { type LOGGER_TYPE_TO_FUNCTION_MAP } from './logger.const';

export type LoggerType = keyof typeof LOGGER_TYPE_TO_FUNCTION_MAP;

export interface LogPayload {
  sourceID: string;
  method: string;
  loggerType?: LoggerType;
  message?: string;
  data?: unknown;
}

export type MethodLogger = (message?: string, data?: unknown) => void;
