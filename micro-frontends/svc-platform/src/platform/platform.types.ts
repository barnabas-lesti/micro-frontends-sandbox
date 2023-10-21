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

export type IsBrowserPayload = (isBrowser: boolean) => void;

export type GetBrowserTypePayload = (browserType: BrowserType) => void;
