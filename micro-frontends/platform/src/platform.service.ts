import { Logger } from '@mfs-packages/utility';

import { type PlatformContract } from './platform.contract';
import { type BrowserType } from './platform.types';

export class PlatformService {
  private static _instance: PlatformService | undefined;

  static create(): PlatformService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private logger = new Logger('PlatformService');
  private _isBrowser: boolean | undefined;
  private _browserType: BrowserType | undefined;

  private constructor() {
    this.logger.info('constructor');

    window.mfsEventBus?.listen<PlatformContract.IsBrowser>(
      'platform:isBrowser',
      (payload) => payload.onSuccess?.(this.isBrowser()),
    );

    window.mfsEventBus?.listen<PlatformContract.GetBrowserType>(
      'platform:getBrowserType',
      (payload) => payload.onSuccess?.(this.getBrowserType()),
    );
  }

  isBrowser(): boolean {
    if (this._isBrowser === undefined) {
      this._isBrowser = typeof window !== 'undefined';
    }
    return this._isBrowser;
  }

  getBrowserType(): BrowserType {
    if (this._browserType === undefined) {
      this._browserType = this.determineBrowserType();
    }
    return this._browserType;
  }

  private determineBrowserType(): BrowserType {
    if (!this.isBrowser()) {
      return null;
    }

    const test = (regExp: RegExp) => {
      return regExp.test(navigator.userAgent);
    };

    if (test(/opr\//i)) {
      return 'Opera';
    } else if (test(/edg/i)) {
      return 'MicrosoftEdge';
    } else if (test(/chrome|chromium|crios/i)) {
      return 'GoogleChrome';
    } else if (test(/firefox|fxios/i)) {
      return 'MozillaFirefox';
    } else if (test(/safari/i)) {
      return 'AppleSafari';
    } else if (test(/trident/i)) {
      return 'MicrosoftInternetExplorer';
    } else if (test(/ucbrowser/i)) {
      return 'UCBrowser';
    } else if (test(/samsungbrowser/i)) {
      return 'SamsungBrowser';
    } else {
      return 'Unknown';
    }
  }
}
