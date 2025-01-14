import { ConfigServiceCommand } from '@mfs/svc-config';
import { type BrowserType, PlatformServiceCommand } from '@mfs/svc-platform';
import { RequestServiceCommand } from '@mfs/svc-request';
import { TelemetryServiceCommand } from '@mfs/svc-telemetry';

import { PAGE_DATA_API_PATH } from './home.const';
import { type PageData } from './home.types';

export class HomeService {
  private static _instance: HomeService | undefined;

  static getInstance(): HomeService {
    return this._instance || (this._instance = new this());
  }

  private _isBannerEnabledPromise?: Promise<boolean>;
  private _pageDataPromise?: Promise<PageData>;
  private _isBrowserPromise?: Promise<boolean>;
  private _browserTypePromise?: Promise<BrowserType>;

  private constructor() {
    mfsEventBus.dispatch(TelemetryServiceCommand.Log, { source: ['web3-app', 'HomeService', 'constructor'] });

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
    if (!this._isBannerEnabledPromise) {
      this._isBannerEnabledPromise = new Promise((resolve) => {
        mfsEventBus.dispatch(ConfigServiceCommand.GetRemoteConfig, (config) =>
          resolve(!!config.features?.isHomePageBannerEnabled),
        );
      });
    }
    return this._isBannerEnabledPromise;
  }

  async getPageData(): Promise<PageData> {
    if (!this._pageDataPromise) {
      this._pageDataPromise = new Promise((resolve) => {
        mfsEventBus.dispatch(RequestServiceCommand.MakeAPIRequest, {
          path: PAGE_DATA_API_PATH,
          callback: (data) => resolve(data as PageData),
        });
      });
    }
    return this._pageDataPromise;
  }

  async isBrowser(): Promise<boolean> {
    if (!this._isBrowserPromise) {
      this._isBrowserPromise = new Promise((resolve) =>
        mfsEventBus.dispatch(PlatformServiceCommand.IsBrowser, resolve),
      );
    }
    return this._isBrowserPromise;
  }

  async getBrowserType(): Promise<BrowserType> {
    if (!this._browserTypePromise) {
      this._browserTypePromise = new Promise((resolve) =>
        mfsEventBus.dispatch(PlatformServiceCommand.GetBrowserType, resolve),
      );
    }
    return this._browserTypePromise;
  }
}
