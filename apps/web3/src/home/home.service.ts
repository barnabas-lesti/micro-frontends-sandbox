import { CONFIG_MICRO_FRONTEND_NAME, RemoteConfigCommand } from '@mfs-micro-frontends/config';
import { type BrowserType, PLATFORM_MICRO_FRONTEND_NAME, PlatformCommand } from '@mfs-micro-frontends/platform';
import { REQUEST_MICRO_FRONTEND_NAME, RequestCommand } from '@mfs-micro-frontends/request';
import { requireMicroFrontends } from '@mfs-packages/micro-frontend-loader';
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

    requireMicroFrontends([REQUEST_MICRO_FRONTEND_NAME, CONFIG_MICRO_FRONTEND_NAME, PLATFORM_MICRO_FRONTEND_NAME]);

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
        mfsEventBus.dispatch(RemoteConfigCommand.Get, {
          onSuccess: (config) => resolve(!!config.features?.isHomePageBannerEnabled),
        });
      });
    }
    return this._isBannerEnabledPromise;
  }

  async getPageData(): Promise<PageData> {
    if (!this._pageDataPromise) {
      this._pageDataPromise = new Promise((resolve) => {
        mfsEventBus.dispatch(RequestCommand.MakeAPIRequest, {
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
