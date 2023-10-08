import { type DispatchPayload } from '@mfs-packages/event-bus';

export interface RequestContract {
  'request:getToAPI': GetAPIRequestPayload;
}

export interface GetAPIRequestPayload extends DispatchPayload<unknown> {
  path: string;
}
