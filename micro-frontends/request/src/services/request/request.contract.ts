import { type DispatchPayload } from '@mfs/shell';

export const enum RequestCommand {
  MakeAPIRequest = 'request:makeAPIRequest',
}

export interface RequestContract {
  [RequestCommand.MakeAPIRequest]: MakeAPIRequestPayload;
}

export interface MakeAPIRequestPayload extends DispatchPayload<unknown> {
  path: string;
}
