import { RequestCommand } from '@mfs/request-mfe';
import { Logger } from '@mfs/utility';

import { REMOTE_CONFIG_API_PATH } from './remote-config.const';
import { RemoteConfigCommand } from './remote-config.contract';
import { type RemoteConfig } from './remote-config.types';

export class RemoteConfigService {
  private static _instance: RemoteConfigService | undefined;

  static getInstance(): RemoteConfigService {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private readonly logger = new Logger('RemoteConfigService');
  private _remoteConfigPromise: Promise<RemoteConfig> | undefined;

  private constructor() {
    this.logger.info('constructor');

    window.mfsEventBus.listen(RemoteConfigCommand.Get, async (payload) => payload.onSuccess?.(await this.get()));
  }

  async get(): Promise<RemoteConfig> {
    if (!this._remoteConfigPromise) {
      this._remoteConfigPromise = new Promise((resolve) => {
        window.mfsEventBus.dispatch(RequestCommand.MakeAPIRequest, {
          path: REMOTE_CONFIG_API_PATH,
          onSuccess: (data) => resolve(data as RemoteConfig),
        });
      });
    }
    return this._remoteConfigPromise;
  }
}
