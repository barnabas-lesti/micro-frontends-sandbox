import { Logger } from '@wrs-packages/utility';
import {
  RemoteConfigCommand,
  type RemoteConfigContract,
} from 'micro-frontends/config/src/remote-config/remote-config.contract';

// interface BannerData {
//   imageURL?: string;
// }

export class HomeService {
  private static _instance: HomeService | undefined;

  static create(): HomeService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private logger = new Logger('HomeService');

  private constructor() {
    this.logger.info('constructor');

    this.isBannerEnabled().then((isEnabled) => this.logger.info('constructor', `isBannerEnabled: "${isEnabled}"`));
    this.isBannerEnabled().then((isEnabled) => this.logger.info('constructor', `isBannerEnabled: "${isEnabled}"`));
    this.isBannerEnabled().then((isEnabled) => this.logger.info('constructor', `isBannerEnabled: "${isEnabled}"`));

    // window.wrsEventBus?.dispatch<StartupConfigContract[StartupConfigCommand.Get]>(StartupConfigCommand.Get, {
    //   onSuccess: (startupConfig) => {
    //     console.log(startupConfig);
    //   },
    // });

    // window.wrsEventBus?.dispatch<RequestContract<null, null>[RequestCommand.GetAPI]>(RequestCommand.GetAPI, {
    //   path: '/test-get-api',
    //   onSuccess: (response) => {
    //     console.log(response);
    //   },
    // });

    // window.wrsEventBus?.dispatch<RequestContract<{ param1: number }, null>[RequestCommand.PostAPI]>(
    //   RequestCommand.PostAPI,
    //   {
    //     path: '/test-post-api',
    //     data: { param1: 10 },
    //     onSuccess: (response) => {
    //       console.log(response);
    //     },
    //   },
    // );
  }

  async isBannerEnabled(): Promise<boolean> {
    return new Promise((resolve) => {
      window.wrsEventBus?.dispatch<RemoteConfigContract[RemoteConfigCommand.Get]>(RemoteConfigCommand.Get, {
        onSuccess: (startupConfig) => resolve(!!startupConfig.features?.isHomePageBannerEnabled),
      });
    });
  }

  // async fetchBannerData(): Promise<BannerData> {}
}
