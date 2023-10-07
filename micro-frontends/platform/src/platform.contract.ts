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
export interface IsBrowserPlatformContractV2 {
  'platform:isBrowser': IsBrowserPayload;
}

export interface GetBrowserTypePlatformContractV2 {
  'platform:getBrowserType': GetBrowserTypePayload;
}

export type PlatformContractV2 = {
  'platform:isBrowser': IsBrowserPayload;
  'platform:getBrowserType': GetBrowserTypePayload;
};

interface IsBrowserPayload {
  onSuccess?: (isBrowser: boolean) => void;
}

interface GetBrowserTypePayload {
  onSuccess?: (browserType: BrowserType) => void;
}
