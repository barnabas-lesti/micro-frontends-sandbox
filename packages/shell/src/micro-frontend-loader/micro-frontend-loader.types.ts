export const enum MicroFrontendLoaderErrorCode {
  MICRO_FRONTENDS_REMOTE_URL_REQUIRED = 'MICRO_FRONTENDS_REMOTE_URL_REQUIRED',
}

export interface LoadMicroFrontendPayload {
  name: string;
  version?: string;
}
