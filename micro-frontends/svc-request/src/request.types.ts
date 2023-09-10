export const enum RequestCommand {
  MakeAPIRequest = 'request:makeAPIRequest',
}

export type RequestContract<RequestData, ResponseData> = {
  [RequestCommand.MakeAPIRequest]: MakeAPIRequestPayload<RequestData, ResponseData>;
};

export type MakeAPIRequestPayload<RequestData, ResponseData> = {
  apiPath: string;
  data?: RequestData;
  callback: (response: MakeAPIRequestResponse<ResponseData>) => void;
};

export interface MakeAPIRequestResponse<ResponseData> {
  status: number;
  data?: ResponseData;
}
