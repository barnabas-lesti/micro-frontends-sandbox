import { type DispatchPayload } from '@mfs-packages/shell';

/**
 * An enumeration of the different types of web browsers.
 */
export const enum BrowserType {
  Opera = 'Opera',
  MicrosoftEdge = 'MicrosoftEdge',
  GoogleChrome = 'GoogleChrome',
  MozillaFirefox = 'MozillaFirefox',
  AppleSafari = 'AppleSafari',
  MicrosoftInternetExplorer = 'MicrosoftInternetExplorer',
  UCBrowser = 'UCBrowser',
  SamsungBrowser = 'SamsungBrowser',
  Unknown = 'Unknown',
}

export interface IsBrowserPayload extends DispatchPayload<boolean> {}

export interface GetBrowserTypePayload extends DispatchPayload<BrowserType> {}
