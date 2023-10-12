import { Logger } from '@mfs-packages/utility';

import { HomeEventBus } from './home.event-bus';

export class HomeService {
  private static _instance: HomeService | undefined;

  static getInstance(): HomeService {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private logger = new Logger(HomeService.name);
  private homePageEventBus = HomeEventBus.getInstance();

  private constructor() {
    this.logger.info('constructor');

    Promise.all([
      this.homePageEventBus.isBannerEnabled(),
      this.homePageEventBus.getPageData(),
      this.homePageEventBus.isBrowser(),
      this.homePageEventBus.getBrowserType(),
    ]).then(([isBannerEnabled, pageData, isBrowser, browserType]) =>
      console.log({
        isBannerEnabled,
        pageData,
        isBrowser,
        browserType,
      }),
    );

    // Testing if multiple calls are omitted to the EventBus
    Promise.all([
      this.homePageEventBus.isBannerEnabled(),
      this.homePageEventBus.getPageData(),
      this.homePageEventBus.isBrowser(),
      this.homePageEventBus.getBrowserType(),
    ]).then(([isBannerEnabled, pageData, isBrowser, browserType]) =>
      console.log({
        isBannerEnabled,
        pageData,
        isBrowser,
        browserType,
      }),
    );
  }
}
