import type { EventBus } from '@wrs/shell';
import { LoggingCommands, LogPayload } from '@wrs/svc-telemetry';

import { ConfigCommands, GetConfigPayload } from './config.contracts';
import { configMock } from './config.mock';

export class ConfigService {
  private eventBus: EventBus;

  private static instance: ConfigService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.eventBus = document['obgEventBus'];

    this.log('constructor');

    this.eventBus.listen<GetConfigPayload>(ConfigCommands.Get, (callback) => {
      // TODO: Implement logic
      window.setTimeout(() => callback(configMock), 1000);
    });
  }

  private log(method: string, message?: string, data?: unknown) {
    this.eventBus.dispatch<LogPayload>(LoggingCommands.Info, {
      sourceId: ConfigService.name,
      method,
      message,
      data,
    });
  }
}
