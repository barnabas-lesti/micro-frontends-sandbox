// V1
export const enum RequestCommand {
  GetAPI = 'request:getAPI',
}

export type RequestContract<ResponseData> = {
  [RequestCommand.GetAPI]: GetAPIRequestPayload<ResponseData>;
};

// V2
export interface GetAPIRequestCommand<ResponseData> {
  'request:getAPI': GetAPIRequestPayload<ResponseData>;
}

export interface GetAPIRequestPayload<ResponseData> {
  path: string;
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: Error) => void;
}
