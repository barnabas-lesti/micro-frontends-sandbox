export type MakeAPIRequestPayload<RequestData> = {
  apiPath: string;
  data?: RequestData;
};

export interface MakeAPIRequestResponse<ResponseData> {
  status: number;
  data?: ResponseData;
}
