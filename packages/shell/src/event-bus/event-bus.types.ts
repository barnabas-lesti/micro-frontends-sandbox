import { type Subject } from 'rxjs';

export type Listener<Payload> = (payload: Payload) => void;

export interface DispatchSubjectMap {
  [command: string]: DispatchSubject<unknown>;
}

export type DispatchSubject<Payload> = Subject<Payload>;

export interface DispatchPayload<SuccessData> {
  onSuccess?: (data: SuccessData) => void;
  onError?: (error: Error) => void;
}
