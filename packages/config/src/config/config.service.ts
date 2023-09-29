import { type MicroFrontendService } from '@wrs/shell/public';
import { getRandomInteger } from '@wrs/utility';

import { ConfigCommand, type ConfigContract } from './config.contract';
import { configMock } from './config.mock';

export class ConfigService implements MicroFrontendService {
  private static instance: ConfigService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {}

  registerSubscriptions(): void {
    document.wrsEventBus.handle<ConfigContract>(ConfigCommand.Get, ({ resolve }) => {
      // TODO: Implement logic
      window.setTimeout(() => resolve(configMock), getRandomInteger(100, 1000));
    });
  }
}
