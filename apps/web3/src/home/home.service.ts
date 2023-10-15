import { RemoteConfigCommand } from '@mfs-micro-frontends/config';
import { type BrowserType, PlatformCommand } from '@mfs-micro-frontends/platform';
import { RequestCommand } from '@mfs-micro-frontends/request';
import { createLogger } from '@mfs-packages/utility';

import { PAGE_DATA_API_PATH } from './home.const';
import { type PageData } from './home.types';

export class HomeService {
  private static _instance: HomeService | undefined;

  static getInstance(): HomeService {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private logger = createLogger('HomeService');
  private _isBannerEnabledPromise?: Promise<boolean>;
  private _pageDataPromise?: Promise<PageData>;
  private _isBrowserPromise?: Promise<boolean>;
  private _browserTypePromise?: Promise<BrowserType>;

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
      this._isBannerEnabledPromise = new Promise((resolve, reject) => {
        mfsEventBus.dispatch(RemoteConfigCommand.Get, {
          onSuccess: (config) => resolve(!!config.features?.isHomePageBannerEnabled),
          onError: (error) => reject(error),
        });
      });
    }
    return this._isBannerEnabledPromise;
  }

  async getPageData(): Promise<PageData> {
    if (!this._pageDataPromise) {
      this._pageDataPromise = new Promise((resolve, reject) => {
        mfsEventBus.dispatch(RequestCommand.MakeAPIRequest, {
          path: PAGE_DATA_API_PATH,
          onSuccess: (data) => resolve(data as PageData),
          onError: (error) => reject(error),
        });
      });
    }
    return this._pageDataPromise;
  }

  async isBrowser(): Promise<boolean> {
    if (!this._isBrowserPromise) {
      this._isBrowserPromise = new Promise((resolve) => {
        mfsEventBus.dispatch(PlatformCommand.IsBrowser, {
          onSuccess: resolve,
        });
      });
    }
    return this._isBrowserPromise;
  }

  async getBrowserType(): Promise<BrowserType> {
    if (!this._browserTypePromise) {
      this._browserTypePromise = new Promise((resolve) => {
        mfsEventBus.dispatch(PlatformCommand.GetBrowserType, {
          onSuccess: resolve,
        });
      });
    }
    return this._browserTypePromise;
  }
}
