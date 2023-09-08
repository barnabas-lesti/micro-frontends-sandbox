import { LogPayload } from './logging.types';

export enum LoggingCommands {
  Debug = 'telemetry:logging:debug',
  Info = 'telemetry:logging:info',
  Warn = 'telemetry:logging:warn',
  Error = 'telemetry:logging:error',
}

export type LoggingContracts = {
  [LoggingCommands.Debug]: LogPayload;
  [LoggingCommands.Info]: LogPayload;
  [LoggingCommands.Warn]: LogPayload;
  [LoggingCommands.Error]: LogPayload;
};
