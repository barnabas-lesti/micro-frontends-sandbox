export const enum RequestCommand {
  MakeAPIRequest = 'request:makeAPIRequest',
}

export type RequestContract<RequestData, ResponseData> = {
  [RequestCommand.MakeAPIRequest]: [MakeAPIRequestPayload<RequestData>, MakeAPIRequestResponse<ResponseData>];
};

export type MakeAPIRequestPayload<RequestData> = {
  apiPath: string;
  data?: RequestData;
};

export interface MakeAPIRequestResponse<ResponseData> {
  status: number;
  data?: ResponseData;
}
