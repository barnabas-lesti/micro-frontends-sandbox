import { LoggingCommand } from './logging.contract';

export const LOGGING_COMMAND_TO_FUNCTION_MAP = {
  [LoggingCommand.Debug]: console.debug,
  [LoggingCommand.Error]: console.error,
  [LoggingCommand.Info]: console.info,
  [LoggingCommand.Warn]: console.warn,
};
