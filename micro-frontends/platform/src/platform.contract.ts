import { type BrowserType } from './platform.types';

export const enum PlatformCommand {
  IsBrowser = 'platform:isBrowser',
  GetBrowserType = 'platform:getBrowserType',
}

export type PlatformContract = {
  [PlatformCommand.IsBrowser]: IsBrowserPayload;
  [PlatformCommand.GetBrowserType]: GetBrowserTypePayload;
};

interface IsBrowserPayload {
  onSuccess?: (isBrowser: boolean) => void;
}

interface GetBrowserTypePayload {
  onSuccess?: (browserType: BrowserType) => void;
}
