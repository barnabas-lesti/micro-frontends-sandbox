export type MakeAPIRequestPayload<RequestData, ResponseData> = {
  apiPath: string;
  data?: RequestData;
  callback: (response: MakeAPIRequestResponse<ResponseData>) => void;
};

export interface MakeAPIRequestResponse<ResponseData> {
  status: number;
  data?: ResponseData;
}
