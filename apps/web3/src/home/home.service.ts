import { type BrowserType, PlatformCommand, type PlatformContract } from '@wrs-micro-frontends/platform/types';
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
  private _isBrowser: Promise<boolean> | undefined;
  private _browserType: Promise<BrowserType> | undefined;

  private constructor() {
    this.logger.info('constructor');

    Promise.all([this.isBannerEnabled(), this.getPageData(), this.isBrowser(), this.getBrowserType()]).then(
      ([isBannerEnabled, pageData, isBrowser, browserType]) =>
        console.log({
          isBannerEnabled,
          pageData,
          isBrowser,
          browserType,
        }),
    );

    // Testing if multiple calls are omitted to the EventBus
    Promise.all([this.isBannerEnabled(), this.getPageData(), this.isBrowser(), this.getBrowserType()]).then(
      ([isBannerEnabled, pageData, isBrowser, browserType]) =>
        console.log({
          isBannerEnabled,
          pageData,
          isBrowser,
          browserType,
        }),
    );
  }

  async isBannerEnabled(): Promise<boolean> {
    if (this._isBannerEnabled === undefined) {
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

  async isBrowser(): Promise<boolean> {
    if (this._isBrowser === undefined) {
      this._isBrowser = new Promise((resolve) => {
        window.wrsEventBus?.dispatch<PlatformContract[PlatformCommand.IsBrowser]>(PlatformCommand.IsBrowser, {
          onSuccess: resolve,
        });
      });
    }
    return this._isBrowser;
  }

  async getBrowserType(): Promise<BrowserType> {
    if (this._browserType === undefined) {
      this._browserType = new Promise((resolve) => {
        window.wrsEventBus?.dispatch<PlatformContract[PlatformCommand.GetBrowserType]>(PlatformCommand.GetBrowserType, {
          onSuccess: resolve,
        });
      });
    }
    return this._browserType;
  }
}
