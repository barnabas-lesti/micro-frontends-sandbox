import { delay, Logger } from '@wrs/utility';

import { remoteConfigMock } from './remote-config.mock';
import { RemoteConfigCommand, type RemoteConfigContract } from './remote-config.types';

export class RemoteConfigService {
  private static _instance: RemoteConfigService;

  static getInstance() {
    return this._instance || (this._instance = new this());
  }

  private logger = new Logger('RemoteConfigService');

  private constructor() {
    this.logger.info('constructor');

    window.wrsEventBus.handle<RemoteConfigContract>(RemoteConfigCommand.Get, (resolve) => {
      // TODO: Implement logic
      delay(() => resolve(remoteConfigMock));
    });
  }
}
