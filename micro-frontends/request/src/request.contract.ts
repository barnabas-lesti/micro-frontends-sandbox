import { type DispatchPayload } from '@mfs-packages/event-bus';

export namespace RequestContract {
  export interface GetToAPI<ResponseData> {
    'request:getToAPI': GetAPIRequestPayload<ResponseData>;
  }
}

export interface GetAPIRequestPayload<ResponseData> extends DispatchPayload<ResponseData> {
  path: string;
}
