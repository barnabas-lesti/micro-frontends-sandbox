import { type FunctionWithPayload } from 'libs/utility';

export interface EventBusEventListenerMap<T> {
  [command: string]: FunctionWithPayload<T>;
}

export interface EventBusEvent<T> {
  command: string;
  payload?: T;
}
