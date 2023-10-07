import { delay, Logger } from '@wrs-packages/utility';

import { StartupConfigCommand, type StartupConfigContract } from './startup-config.contract';
import { startupConfigMock } from './startup-config.mocks';

export class StartupConfigService {
  private static _instance: StartupConfigService | undefined;

  static create(): StartupConfigService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private logger = new Logger('StartupConfigService');

  private constructor() {
    this.logger.info('constructor');

    window.wrsEventBus?.listen<StartupConfigContract[StartupConfigCommand.Get]>(StartupConfigCommand.Get, (payload) => {
      // TODO: Implement logic
      delay(() => payload.onSuccess?.(startupConfigMock));
    });
  }
}
