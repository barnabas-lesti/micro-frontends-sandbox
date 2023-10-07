import { type DispatchPayload } from 'packages/event-bus/types';

export namespace RequestContract {
  export interface GetToAPI<ResponseData> {
    'request:getToAPI': GetAPIRequestPayload<ResponseData>;
  }
}

export interface GetAPIRequestPayload<ResponseData> extends DispatchPayload<ResponseData> {
  path: string;
}
