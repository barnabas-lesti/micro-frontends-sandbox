import { RequestServiceCommand } from '@mfs/svc-request';
import { TelemetryServiceCommand } from '@mfs/svc-telemetry';

import { ConfigServiceCommand } from '..';
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

  private _remoteConfigPromise: Promise<RemoteConfig> | undefined;

  private constructor() {
    mfsEventBus.dispatch(TelemetryServiceCommand.Log, { sourceID: 'RemoteConfigService', method: 'constructor' });

    mfsEventBus.listen(ConfigServiceCommand.GetRemoteConfig, async (callback) => callback(await this.get()));
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
        mfsEventBus.dispatch(RequestServiceCommand.MakeAPIRequest, {
          path: REMOTE_CONFIG_API_PATH,
          callback: (data) => resolve(data as RemoteConfig),
        });
      });
    }
    return this._remoteConfigPromise;
  }
}
