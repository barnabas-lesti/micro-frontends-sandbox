import { getRandomInteger } from '@wrs/lib-utility';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/contract';

import { ConfigCommand, ConfigContract } from './config.contract';
import { configMock } from './config.mock';

export class ConfigService {
  private static instance: ConfigService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.log('constructor');

    document.wrsEventBus.handle<ConfigContract>(ConfigCommand.Get, (payload) => {
      // TODO: Implement logic
      window.setTimeout(() => payload.callback(configMock), getRandomInteger(100, 1000));
    });
  }

  private log(method: string, message?: string, data?: unknown) {
    document.wrsEventBus.dispatch<LoggingContract>(LoggingCommand.Info, {
      sourceId: ConfigService.name,
      method,
      message,
      data,
    });
  }
}
