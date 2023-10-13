import { Logger } from '@mfs-packages/utility';

import { PlatformCommand } from './platform.contract';
import { BrowserType } from './platform.types';

export class PlatformService {
  private static _instance: PlatformService | undefined;

  static create(): PlatformService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private readonly logger = new Logger('PlatformService');
  private _isBrowser: boolean | undefined;
  private _browserType: BrowserType | undefined;

  private constructor() {
    this.logger.info('constructor');

    window.mfsEventBus.listen(PlatformCommand.IsBrowser, (payload) => payload.onSuccess?.(this.isBrowser()));
    window.mfsEventBus.listen(PlatformCommand.GetBrowserType, (payload) => payload.onSuccess?.(this.getBrowserType()));
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
      return BrowserType.Unknown;
    }

    const test = (regExp: RegExp) => {
      return regExp.test(navigator.userAgent);
    };

    if (test(/opr\//i)) {
      return BrowserType.Opera;
    } else if (test(/edg/i)) {
      return BrowserType.MicrosoftEdge;
    } else if (test(/chrome|chromium|crios/i)) {
      return BrowserType.GoogleChrome;
    } else if (test(/firefox|fxios/i)) {
      return BrowserType.MozillaFirefox;
    } else if (test(/safari/i)) {
      return BrowserType.AppleSafari;
    } else if (test(/trident/i)) {
      return BrowserType.MicrosoftInternetExplorer;
    } else if (test(/ucbrowser/i)) {
      return BrowserType.UCBrowser;
    } else if (test(/samsungbrowser/i)) {
      return BrowserType.SamsungBrowser;
    } else {
      return BrowserType.Unknown;
    }
  }
}
