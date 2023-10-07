export const enum RequestCommand {
  GetAPI = 'request:getAPI',
  PostAPI = 'request:postAPI',
}

export type RequestContract<RequestData, ResponseData> = {
  [RequestCommand.GetAPI]: GetAPIRequestPayload<ResponseData>;
  [RequestCommand.PostAPI]: PostAPIRequestPayload<RequestData, ResponseData>;
};

export interface GetAPIRequestPayload<ResponseData> {
  path: string;
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: Error) => void;
}

export interface PostAPIRequestPayload<RequestData, ResponseData> {
  path: string;
  data?: RequestData;
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: Error) => void;
}
