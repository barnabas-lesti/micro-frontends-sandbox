import { Logger } from '@wrs-packages/utility';

import {
  type IsBrowserPlatformContractV2,
  PlatformCommand,
  type PlatformContract,
  type PlatformContractV2,
} from './platform.contract';
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

    window.wrsEventBus?.listen<PlatformContract[PlatformCommand.IsBrowser]>(
      PlatformCommand.IsBrowser,
      (payload) => payload.onSuccess?.(this.isBrowser()),
    );

    window.wrsEventBus?.listen<PlatformContract[PlatformCommand.GetBrowserType]>(
      PlatformCommand.GetBrowserType,
      (payload) => payload.onSuccess?.(this.getBrowserType()),
    );

    window.wrsEventBusV2?.listen<PlatformContractV2>('platform:isBrowser', (payload) => {
      void payload;
      // Not good: "payload: IsBrowserPayload | GetBrowserTypePayload".
      // The same issue would happen if the EventBus itself would be generic and we would like to add contracts with
      // & or | in the custom.d.ts file.
    });

    window.wrsEventBusV2?.listen<IsBrowserPlatformContractV2>('platform:isBrowser', (payload) => {
      void payload;
      // This is ok: "payload: IsBrowserPayload".
    });
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
