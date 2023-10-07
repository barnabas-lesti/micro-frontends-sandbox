import { type Subject } from 'rxjs';

export type ContractBase = {
  [key: Command]: [unknown, unknown];
};

export type Command = string;

export interface DispatchCommandSubjectMap {
  [command: Command]: DispatchCommandSubject<unknown, unknown>;
}

export type DispatchCommandSubject<Payload, Result> = Subject<DispatchCommandSubjectEntry<Payload, Result>>;

export type DispatchCommandSubjectEntry<Payload, Result> = {
  payload: Payload;
  subject: Subject<Result>;
};

export type DispatchHandler<Payload, Result> = (resolve: DispatchHandlerResolve<Result>, payload: Payload) => void;

export type DispatchCallback<Result> = (result: Result) => void;

type DispatchHandlerResolve<Result> = (result: Result) => void;
