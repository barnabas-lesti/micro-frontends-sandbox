import { type BrowserType } from './platform.types';

// V1
export const enum PlatformCommand {
  IsBrowser = 'platform:isBrowser',
  GetBrowserType = 'platform:getBrowserType',
}

export type PlatformContract = {
  [PlatformCommand.IsBrowser]: IsBrowserPayload;
  [PlatformCommand.GetBrowserType]: GetBrowserTypePayload;
};

// V2
export interface IsBrowserPlatformCommand {
  'platform:isBrowser': IsBrowserPayload;
}

export interface GetBrowserTypePlatformCommand {
  'platform:getBrowserType': GetBrowserTypePayload;
}

interface IsBrowserPayload {
  onSuccess?: (isBrowser: boolean) => void;
}

interface GetBrowserTypePayload {
  onSuccess?: (browserType: BrowserType) => void;
}
