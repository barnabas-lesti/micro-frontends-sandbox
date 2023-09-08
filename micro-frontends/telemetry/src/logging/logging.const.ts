import { LoggingCommands } from './logging.contracts';

export const LOGGING_COMMAND_TO_FUNCTION_MAP = {
  [LoggingCommands.Debug]: console.debug,
  [LoggingCommands.Error]: console.error,
  [LoggingCommands.Info]: console.info,
  [LoggingCommands.Warn]: console.warn,
};
