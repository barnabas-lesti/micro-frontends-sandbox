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

export interface LogPayload {
  sourceId: string;
  method: string;
  message?: string | Error;
  data?: unknown;
}

type LogCommandTypes = [LogPayload, void];
