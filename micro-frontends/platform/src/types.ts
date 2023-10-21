import { type GetBrowserTypePayload, type IsBrowserPayload } from './services/platform';

export { type BrowserType } from './services/platform';

/**
 * Enum representing the available platform commands.
 */
export const enum PlatformMFECommand {
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
export interface PlatformMFEContract {
  [PlatformMFECommand.IsBrowser]: IsBrowserPayload;
  [PlatformMFECommand.GetBrowserType]: GetBrowserTypePayload;
}
