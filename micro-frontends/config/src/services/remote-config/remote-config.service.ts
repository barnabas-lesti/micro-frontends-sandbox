import { RequestCommand } from '@mfs-micro-frontends/request/contract';
import { createLogger } from '@mfs-packages/utility';

import { ConfigCommand } from '../../contract';
import { REMOTE_CONFIG_API_PATH } from './remote-config.const';
import { type RemoteConfig } from './remote-config.types';

/**
 * A service for retrieving remote configuration data from the server.
 */
export class RemoteConfigService {
  private static _instance: RemoteConfigService | undefined;

  static getInstance(): RemoteConfigService {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private readonly logger = createLogger('RemoteConfigService');
  private _remoteConfigPromise: Promise<RemoteConfig> | undefined;

  private constructor() {
    this.logger.info('constructor');

    mfsEventBus.listen(ConfigCommand.GetRemoteConfig, async (payload) => payload.onSuccess?.(await this.get()));
  }

  /**
   * Retrieves the remote configuration data from the server.
   * If the data has already been retrieved, returns a cached Promise that resolves with the data.
   * Otherwise, makes an API request to fetch the data and caches the Promise for future use.
   * @returns A Promise that resolves with the remote configuration data.
   */
  async get(): Promise<RemoteConfig> {
    if (!this._remoteConfigPromise) {
      this._remoteConfigPromise = new Promise((resolve) => {
        mfsEventBus.dispatch(RequestCommand.MakeAPIRequest, {
          path: REMOTE_CONFIG_API_PATH,
          onSuccess: (data) => resolve(data as RemoteConfig),
        });
      });
    }
    return this._remoteConfigPromise;
  }
}
