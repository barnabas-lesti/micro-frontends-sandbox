import { LogPayload } from './logging.types';

export enum LoggingCommand {
  Debug = 'telemetry:logging:debug',
  Info = 'telemetry:logging:info',
  Warn = 'telemetry:logging:warn',
  Error = 'telemetry:logging:error',
}

export type LoggingContract = {
  [LoggingCommand.Debug]: LogCommandTypes;
  [LoggingCommand.Info]: LogCommandTypes;
  [LoggingCommand.Warn]: LogCommandTypes;
  [LoggingCommand.Error]: LogCommandTypes;
};

type LogCommandTypes = [LogPayload, void];
