import { type RequestContract } from '@mfs-micro-frontends/request/types';
import { Logger } from '@mfs-packages/utility';

import { REMOTE_CONFIG_API_PATH } from './remote-config.const';
import { type RemoteConfigContract } from './remote-config.contract';
import { type RemoteConfig } from './remote-config.types';

export class RemoteConfigService {
  private static _instance: RemoteConfigService | undefined;

  static create(): RemoteConfigService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private logger = new Logger('RemoteConfigService');
  private _remoteConfigPromise: Promise<RemoteConfig> | undefined;

  private constructor() {
    this.logger.info('constructor');

    window.mfsEventBus?.listen<RemoteConfigContract.Get>(
      'remoteConfig:get',
      async (payload) => payload.onSuccess?.(await this.get()),
    );
  }

  async get(): Promise<RemoteConfig> {
    if (!this._remoteConfigPromise) {
      this._remoteConfigPromise = new Promise((resolve) => {
        window.mfsEventBus?.dispatch<RequestContract.GetToAPI<RemoteConfig>>('request:getToAPI', {
          path: REMOTE_CONFIG_API_PATH,
          onSuccess: resolve,
        });
      });
    }
    return this._remoteConfigPromise;
  }
}
