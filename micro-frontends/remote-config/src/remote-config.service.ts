import { RequestCommand, type RequestContract } from '@wrs-micro-frontends/request/types';
import { Logger } from '@wrs-packages/utility';

import { REMOTE_CONFIG_API_PATH } from './remote-config.const';
import { RemoteConfigCommand, type RemoteConfigContract } from './remote-config.contract';
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
  private _config: Promise<RemoteConfig> | undefined;

  private constructor() {
    this.logger.info('constructor');

    window.wrsEventBus?.listen<RemoteConfigContract[RemoteConfigCommand.Get]>(
      RemoteConfigCommand.Get,
      async (payload) => payload.onSuccess?.(await this.get()),
    );
  }

  async get(): Promise<RemoteConfig> {
    if (!this._config) {
      this._config = new Promise((resolve) => {
        window.wrsEventBus?.dispatch<RequestContract<null, RemoteConfig>[RequestCommand.GetAPI]>(
          RequestCommand.GetAPI,
          {
            path: REMOTE_CONFIG_API_PATH,
            onSuccess: resolve,
          },
        );
      });
    }
    return this._config;
  }
}
