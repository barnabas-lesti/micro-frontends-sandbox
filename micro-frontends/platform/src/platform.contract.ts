import { type DispatchPayload } from '@mfs-packages/event-bus';

import { type BrowserType } from './platform.types';

export interface PlatformContract {
  'platform:isBrowser': IsBrowserPayload;
  'platform:getBrowserType': GetBrowserTypePayload;
}

interface IsBrowserPayload extends DispatchPayload<boolean> {}

interface GetBrowserTypePayload extends DispatchPayload<BrowserType> {}
