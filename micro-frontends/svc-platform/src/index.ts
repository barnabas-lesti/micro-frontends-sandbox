import { type GetBrowserTypePayload, type IsBrowserPayload } from './platform';

export { type BrowserType } from './platform';

export const PLATFORM_SERVICE_NAME = 'svc-platform';

/**
 * Enum representing the available platform commands.
 */
export const enum PlatformServiceCommand {
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
export interface PlatformServiceContract {
  [PlatformServiceCommand.IsBrowser]: IsBrowserPayload;
  [PlatformServiceCommand.GetBrowserType]: GetBrowserTypePayload;
}
