export const enum RequestErrorCode {
  API_URL_REQUIRED = 'API_URL_REQUIRED',
}

export interface MakeAPIRequestPayload {
  path: string;
  callback: (data: unknown) => void;
}
