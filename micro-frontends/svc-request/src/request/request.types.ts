export const enum RequestErrorCode {
  API_BASE_URL_REQUIRED = 'API_BASE_URL_REQUIRED',
}

export interface MakeAPIRequestPayload {
  path: string;
  callback: (data: unknown) => void;
}
