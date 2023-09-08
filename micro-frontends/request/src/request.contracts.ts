import { SendRequestResponse } from './request.types';

export const enum RequestCommands {
  Send = 'request:send',
}

export type SendRequestPayload<T> = (response: SendRequestResponse<T>) => void;
