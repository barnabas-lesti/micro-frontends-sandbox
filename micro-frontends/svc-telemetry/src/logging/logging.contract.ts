import { LogPayload } from './logging.types';

export enum LoggingCommand {
  Debug = 'telemetry:logging:debug',
  Info = 'telemetry:logging:info',
  Warn = 'telemetry:logging:warn',
  Error = 'telemetry:logging:error',
}

export type LoggingContract = {
  [LoggingCommand.Debug]: LogPayload;
  [LoggingCommand.Info]: LogPayload;
  [LoggingCommand.Warn]: LogPayload;
  [LoggingCommand.Error]: LogPayload;
};
