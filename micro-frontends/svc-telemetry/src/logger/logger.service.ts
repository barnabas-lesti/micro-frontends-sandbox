import { log } from '@mfs/utility';

import { TelemetryServiceCommand } from '../contract';

export class LoggerService {
  private static _instance: LoggerService | undefined;

  static getInstance(): LoggerService {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    log({ source: ['svc-telemetry', 'LoggerService', 'constructor'] });

    mfsEventBus.listen(TelemetryServiceCommand.Log, (payload) => log(payload));
  }
}
