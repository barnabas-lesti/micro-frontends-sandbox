export interface RequestStartupConfig {
  apiBaseURL?: string;
}

export const enum RequestErrorCode {
  API_BASE_URL_REQUIRED = 'API_BASE_URL_REQUIRED',
}
