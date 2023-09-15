import { MakeAPIRequestPayload, MakeAPIRequestResponse } from './request.types';

export const enum RequestCommand {
  MakeAPIRequest = 'request:makeAPIRequest',
}

export type RequestContract<RequestDataType, ResponseDataType> = {
  [RequestCommand.MakeAPIRequest]: [MakeAPIRequestPayload<RequestDataType>, MakeAPIRequestResponse<ResponseDataType>];
};
