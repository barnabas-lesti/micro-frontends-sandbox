export interface MicroFrontendOptions {
  name: string;
  version?: string;
}

export const enum MicroFrontendLoaderErrorCode {
  MICRO_FRONTENDS_REMOTE_URL_REQUIRED = 'MICRO_FRONTENDS_REMOTE_URL_REQUIRED',
}
