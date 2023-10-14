import { type Subject } from 'rxjs';

export type Listener<Payload> = (payload: Payload) => void;

export interface DispatchSubjectMap {
  [command: string]: DispatchSubject<unknown>;
}

export type DispatchSubject<Payload> = Subject<Payload>;

/**
 * Payload for dispatching events with optional success and error callbacks.
 * @template SuccessData The type of data that the onSuccess callback will receive.
 */
export interface DispatchPayload<SuccessData> {
  onSuccess?: (data: SuccessData) => void;
  onError?: (error: Error) => void;
}
