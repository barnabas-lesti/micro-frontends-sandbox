export namespace RequestContract {
  export interface GetToAPI<ResponseData> {
    'request:getToAPI': GetAPIRequestPayload<ResponseData>;
  }
}

export interface GetAPIRequestPayload<ResponseData> {
  path: string;
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: Error) => void;
}
