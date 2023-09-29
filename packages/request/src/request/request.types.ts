export type MakeAPIRequestPayload<RequestDataType> = {
  apiPath: string;
  data?: RequestDataType;
};

export interface MakeAPIRequestResponse<ResponseDataType> {
  status: number;
  data?: ResponseDataType;
}
