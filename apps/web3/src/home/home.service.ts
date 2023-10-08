import { type BrowserType } from '@mfs-micro-frontends/platform';
import { Logger } from '@mfs-packages/utility';

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

  private _isBannerEnabledPromise: Promise<boolean> | undefined;
  private _pageDataPromise: Promise<PageData> | undefined;
  private _isBrowserPromise: Promise<boolean> | undefined;
  private _browserTypePromise: Promise<BrowserType> | undefined;
  private logger = new Logger('HomeService');

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
    if (!this._isBannerEnabledPromise) {
      this._isBannerEnabledPromise = new Promise((resolve) => {
        window.mfsEventBus?.dispatch('remoteConfig:get', {
          onSuccess: (config) => resolve(!!config.features?.isHomePageBannerEnabled),
        });
      });
    }
    return this._isBannerEnabledPromise;
  }

  async getPageData(): Promise<PageData> {
    if (!this._pageDataPromise) {
      this._pageDataPromise = new Promise((resolve) => {
        window.mfsEventBus?.dispatch('request:getToAPI', {
          path: PAGE_DATA_API_PATH,
          onSuccess: (data) => resolve(data as PageData),
        });
      });
    }
    return this._pageDataPromise;
  }

  async isBrowser(): Promise<boolean> {
    if (!this._isBrowserPromise) {
      this._isBrowserPromise = new Promise((resolve) => {
        window.mfsEventBus?.dispatch('platform:isBrowser', {
          onSuccess: resolve,
        });
      });
    }
    return this._isBrowserPromise;
  }

  async getBrowserType(): Promise<BrowserType> {
    if (!this._browserTypePromise) {
      this._browserTypePromise = new Promise((resolve) => {
        window.mfsEventBus?.dispatch('platform:getBrowserType', {
          onSuccess: resolve,
        });
      });
    }
    return this._browserTypePromise;
  }
}
