import { type LogPayload } from './logger';

export { type LogPayload };

export const enum TelemetryServiceCommand {
  Log = 'svc-telemetry:logger:log',
}

export interface TelemetryServiceContract {
  [TelemetryServiceCommand.Log]: LogPayload;
}
