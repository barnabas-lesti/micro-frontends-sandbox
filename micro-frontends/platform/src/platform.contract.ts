import { type BrowserType } from './platform.types';

export namespace PlatformContract {
  export interface IsBrowser {
    'platform:isBrowser': IsBrowserPayload;
  }

  export interface GetBrowserType {
    'platform:getBrowserType': GetBrowserTypePayload;
  }
}

interface IsBrowserPayload {
  onSuccess?: (isBrowser: boolean) => void;
}

interface GetBrowserTypePayload {
  onSuccess?: (browserType: BrowserType) => void;
}
