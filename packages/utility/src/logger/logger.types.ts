import { type LOGGER_TYPE_TO_FUNCTION_MAP } from './logger.const';

export type LoggerType = keyof typeof LOGGER_TYPE_TO_FUNCTION_MAP;
