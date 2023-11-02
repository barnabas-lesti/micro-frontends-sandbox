export const enum MicroFrontendLoaderErrorCode {
  MICRO_FRONTENDS_REMOTE_URL_REQUIRED = 'MICRO_FRONTENDS_REMOTE_URL_REQUIRED',
}

export interface LoadMicroFrontendServicePayload {
  name: string;
  version?: string;
}

export type ScriptTagType = 'module' | 'text/javascript';
