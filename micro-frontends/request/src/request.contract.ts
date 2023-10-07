export namespace RequestContract {
  export interface GetAPI<ResponseData> {
    'request:getAPI': GetAPIRequestPayload<ResponseData>;
  }
}

export interface GetAPIRequestPayload<ResponseData> {
  path: string;
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: Error) => void;
}
