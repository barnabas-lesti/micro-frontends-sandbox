import { type DispatchPayload } from '@mfs-packages/shell';

export interface RequestStartupConfig {
  apiBaseURL?: string;
}

export const enum RequestErrorCode {
  API_BASE_URL_REQUIRED = 'API_BASE_URL_REQUIRED',
}

export interface MakeAPIRequestPayload extends DispatchPayload<unknown> {
  path: string;
}
