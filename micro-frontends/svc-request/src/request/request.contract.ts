import { MakeAPIRequestPayload } from './request.types';

export const enum RequestCommand {
  MakeAPIRequest = 'request:makeAPIRequest',
}

export type RequestContract<RequestData, ResponseData> = {
  [RequestCommand.MakeAPIRequest]: MakeAPIRequestPayload<RequestData, ResponseData>;
};
