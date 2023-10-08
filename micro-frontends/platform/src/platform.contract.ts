import { type DispatchPayload } from '@mfs-packages/event-bus';

import { type BrowserType } from './platform.types';

export namespace PlatformContract {
  export interface IsBrowser {
    'platform:isBrowser': IsBrowserPayload;
  }

  export interface GetBrowserType {
    'platform:getBrowserType': GetBrowserTypePayload;
  }
}

interface IsBrowserPayload extends DispatchPayload<boolean> {}

interface GetBrowserTypePayload extends DispatchPayload<BrowserType> {}
