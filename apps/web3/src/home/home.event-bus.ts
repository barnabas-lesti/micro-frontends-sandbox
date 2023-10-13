import { type BrowserType } from '@mfs-micro-frontends/platform';
import { Logger } from '@mfs-packages/utility';

import { PAGE_DATA_API_PATH } from './home.const';
import { type PageData } from './home.types';

export class HomeEventBus {
  private logger = new Logger(HomeEventBus.name);

  private _isBannerEnabledPromise?: Promise<boolean>;
  private _pageDataPromise?: Promise<PageData>;
  private _isBrowserPromise?: Promise<boolean>;
  private _browserTypePromise?: Promise<BrowserType>;

  private static _instance: HomeEventBus | undefined;

  static getInstance(): HomeEventBus {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private constructor() {
    this.logger.info('constructor');
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
