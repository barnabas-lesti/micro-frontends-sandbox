import { TelemetryServiceCommand } from '@mfs/svc-telemetry';

import { PlatformServiceCommand } from '..';
import { BrowserType } from './platform.types';

export class PlatformService {
  private static _instance: PlatformService | undefined;

  static getInstance(): PlatformService {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private _isBrowser: boolean | undefined;
  private _browserType: BrowserType | undefined;

  private constructor() {
    mfsEventBus.dispatch(TelemetryServiceCommand.Log, { source: ['svc-platform', 'PlatformService', 'constructor'] });

    mfsEventBus.listen(PlatformServiceCommand.IsBrowser, (callback) => callback(this.isBrowser()));
    mfsEventBus.listen(PlatformServiceCommand.GetBrowserType, (callback) => callback(this.getBrowserType()));
  }

  /**
   * Returns a boolean indicating whether the current environment is a browser or not.
   * @returns - True if the current environment is a browser, false otherwise.
   */
  isBrowser(): boolean {
    if (this._isBrowser === undefined) {
      this._isBrowser = typeof window !== 'undefined';
    }
    return this._isBrowser;
  }

  /**
   * Returns the type of browser being used.
   * @returns The type of browser being used.
   */
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
