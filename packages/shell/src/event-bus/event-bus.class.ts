import { Logger } from '@wrs/utility';
import { AsyncSubject, lastValueFrom, type Observable, ReplaySubject, take } from 'rxjs';

import { REPLAY_BUFFER_WINDOW_TIME } from './event-bus.const';
import {
  type Command,
  type ContractBase,
  type DispatchCallback,
  type DispatchCommandSubject,
  type DispatchCommandSubjectEntry,
  type DispatchCommandSubjectMap,
  type DispatchHandler,
} from './event-bus.types';

export class EventBus {
  private logger = new Logger('EventBus');
  private dispatchSubjectMap: DispatchCommandSubjectMap = {};

  constructor() {
    this.logger.info('constructor');
  }

  dispatch<Contract extends ContractBase>(
    command: keyof Contract & Command,
    payload: Contract[typeof command][0],
    callback: DispatchCallback<Contract[typeof command][0]>,
  ): void {
    this.dispatch$(command, payload).subscribe(callback);
  }

  async dispatchAsync<Contract extends ContractBase>(
    command: keyof Contract & Command,
    payload: Contract[typeof command][0],
  ): Promise<Contract[typeof command][1]> {
    return lastValueFrom(this.dispatch$(command, payload));
  }

  dispatch$<Contract extends ContractBase>(
    command: keyof Contract & Command,
    payload: Contract[typeof command][0],
  ): Observable<Contract[typeof command][1]> {
    this.logger.info('dispatch', command, payload);

    const dispatchEntrySubject = new AsyncSubject<Contract[typeof command][1]>();
    this.ensureDispatchCommandSubject<Contract>(command).next({
      payload,
      subject: dispatchEntrySubject,
    });

    return dispatchEntrySubject.asObservable().pipe(take(1));
  }

  handle<Contract extends ContractBase>(
    command: keyof Contract & Command,
    handler: DispatchHandler<Contract[typeof command][0], Contract[typeof command][1]>,
  ): void {
    this.ensureDispatchCommandSubject<Contract>(command)
      .asObservable()
      .subscribe(({ payload, subject }) => {
        handler((result: Contract[typeof command][1]) => {
          this.logger.info('handle', command, result);
          subject.next(result);
          subject.complete();
        }, payload);
      });

    this.logger.info('handle', `Registered handler for "${command}"`);
  }

  private ensureDispatchCommandSubject<Contract extends ContractBase>(
    command: keyof Contract & Command,
  ): DispatchCommandSubject<Contract[typeof command][0], Contract[typeof command][1]> {
    if (!this.dispatchSubjectMap[command]) {
      this.dispatchSubjectMap[command] = new ReplaySubject<
        DispatchCommandSubjectEntry<Contract[typeof command][0], Contract[typeof command][1]>
      >(null, REPLAY_BUFFER_WINDOW_TIME);
    }
    return this.dispatchSubjectMap[command] as DispatchCommandSubject<
      Contract[typeof command][0],
      Contract[typeof command][1]
    >;
  }
}
