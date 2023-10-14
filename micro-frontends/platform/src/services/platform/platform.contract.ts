import { type DispatchPayload } from '@mfs-packages/event-bus';

import { type BrowserType } from './platform.types';

/**
 * Enum representing the available platform commands.
 */
export const enum PlatformCommand {
  /**
   * Command to determine if the app is running in a browser environment or not.
   */
  IsBrowser = 'platform:isBrowser',

  /**
   * Command to determine the browser type.
   */
  GetBrowserType = 'platform:getBrowserType',
}

/**
 * Defines the contract for the platform service.
 */
export interface PlatformContract {
  [PlatformCommand.IsBrowser]: IsBrowserPayload;
  [PlatformCommand.GetBrowserType]: GetBrowserTypePayload;
}

interface IsBrowserPayload extends DispatchPayload<boolean> {}

interface GetBrowserTypePayload extends DispatchPayload<BrowserType> {}
