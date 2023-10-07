import { RemoteConfigCommand, type RemoteConfigContract } from '@wrs-micro-frontends/remote-config/types';
import { Logger } from '@wrs-packages/utility';
import { RequestCommand, type RequestContract } from 'micro-frontends/request/types';

import { PAGE_DATA_API_PATH } from './home.const';
import { type PageData } from './home.types';

export class HomeService {
  private static _instance: HomeService | undefined;

  static create(): HomeService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private logger = new Logger('HomeService');
  private _isBannerEnabled: Promise<boolean> | undefined;
  private _pageData: Promise<PageData> | undefined;

  private constructor() {
    this.logger.info('constructor');

    this.isBannerEnabled().then((isEnabled) => this.logger.info('constructor', 'isBannerEnabled:', isEnabled));

    this.getPageData().then((pageData) => this.logger.info('constructor', 'pageData:', pageData));
  }

  async isBannerEnabled(): Promise<boolean> {
    if (!this._isBannerEnabled) {
      this._isBannerEnabled = new Promise((resolve) => {
        window.wrsEventBus?.dispatch<RemoteConfigContract[RemoteConfigCommand.Get]>(RemoteConfigCommand.Get, {
          onSuccess: (startupConfig) => resolve(!!startupConfig.features?.isHomePageBannerEnabled),
        });
      });
    }
    return this._isBannerEnabled;
  }

  async getPageData(): Promise<PageData> {
    if (!this._pageData) {
      this._pageData = new Promise((resolve) => {
        window.wrsEventBus?.dispatch<RequestContract<null, PageData>[RequestCommand.GetAPI]>(RequestCommand.GetAPI, {
          path: PAGE_DATA_API_PATH,
          onSuccess: resolve,
        });
      });
    }
    return this._pageData;
  }
}
