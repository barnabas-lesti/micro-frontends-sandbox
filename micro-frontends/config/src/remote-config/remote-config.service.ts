import { delay, Logger } from '@wrs-packages/utility';

import { RemoteConfigCommand, type RemoteConfigContract } from './remote-config.contract';
import { remoteConfigMock } from './remote-config.mocks';

export class RemoteConfigService {
  private static _instance: RemoteConfigService | undefined;

  static create(): RemoteConfigService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private logger = new Logger('RemoteConfigService');

  private constructor() {
    this.logger.info('constructor');

    window.wrsEventBus?.listen<RemoteConfigContract[RemoteConfigCommand.Get]>(RemoteConfigCommand.Get, (payload) => {
      // TODO: Implement logic
      delay(() => payload.onSuccess?.(remoteConfigMock));
    });
  }
}
