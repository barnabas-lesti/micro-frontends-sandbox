import { type GetBrowserTypePayload, type IsBrowserPayload } from './services/platform';

export { type BrowserType } from './services/platform';

/**
 * Enum representing the available platform commands.
 */
export const enum PlatformCommand {
  /**
   * Command to determine if the app is running in a browser environment or not.
   */
  IsBrowser = 'svc-platform:is-browser',

  /**
   * Command to determine the browser type.
   */
  GetBrowserType = 'svc-platform:get-browser-type',
}

/**
 * Defines the contract for the platform service.
 */
export interface PlatformContract {
  [PlatformCommand.IsBrowser]: IsBrowserPayload;
  [PlatformCommand.GetBrowserType]: GetBrowserTypePayload;
}
