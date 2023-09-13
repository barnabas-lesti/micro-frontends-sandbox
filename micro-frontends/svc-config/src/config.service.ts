import { getRandomInteger } from '@wrs/lib-utility';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/public';
import { type EventBus } from '@wrs/shell/public';

import { configMock } from './config.mock';
import { ConfigCommand, ConfigContract } from './config.types';

export class ConfigService {
  private eventBus: EventBus;

  private static instance: ConfigService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.eventBus = document['obgEventBus'];

    this.log('constructor');

    this.eventBus.listen<ConfigContract>(ConfigCommand.Get, (payload) => {
      // TODO: Implement logic
      window.setTimeout(() => payload.callback(configMock), getRandomInteger(100, 1000));
    });
  }

  private log(method: string, message?: string, data?: unknown) {
    this.eventBus.dispatch<LoggingContract>(LoggingCommand.Info, {
      sourceId: ConfigService.name,
      method,
      message,
      data,
    });
  }
}
