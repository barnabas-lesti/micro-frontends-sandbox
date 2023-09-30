import { Logger } from '@wrs/utility';
import { AsyncSubject, lastValueFrom, type Observable, ReplaySubject, type Subject } from 'rxjs';

import { type EventBusContract } from './event-bus.types';

type EventBusCommand = string;

interface EventBusDispatchSubjectMap {
  [command: EventBusCommand]: EventBusDispatchSubject<unknown, unknown>;
}

type EventBusDispatchSubject<Payload, Result> = Subject<EventBusDispatchSubjectItem<Payload, Result>>;

type EventBusDispatchSubjectItem<Payload, Result> = {
  payload?: Payload;
  subject: Subject<Result>;
};

type EventBusDispatchHandler<Payload, Result> = (
  resolve: EventBusDispatchHandlerResolve<Result>,
  payload?: Payload,
) => void;

type EventBusDispatchHandlerResolve<Result> = (result?: Result) => void;

const REPLAY_BUFFER_WINDOW_TIME = 10000;

export class EventBus {
  private logger = new Logger('EventBus');
  private dispatchSubjectMap: EventBusDispatchSubjectMap = {};

  constructor() {
    this.logger.info('constructor');
  }

  async dispatchAsync<Contract extends EventBusContract>(
    command: keyof Contract & EventBusCommand,
    payload?: Contract[typeof command][0],
  ): Promise<Contract[typeof command][1]> {
    return lastValueFrom(this.dispatch$(command, payload));
  }

  dispatch$<Contract extends EventBusContract>(
    command: keyof Contract & EventBusCommand,
    payload?: Contract[typeof command][0],
  ): Observable<Contract[typeof command][1]> {
    this.logger.info('dispatch$', command);

    const dispatchSubject = new AsyncSubject<Contract[typeof command][1]>();
    this.ensureDispatchSubject<Contract>(command).next({
      payload,
      subject: dispatchSubject,
    });

    return dispatchSubject.asObservable();
  }

  handle<Contract extends EventBusContract>(
    command: keyof Contract & EventBusCommand,
    handler: EventBusDispatchHandler<Contract[typeof command][0], Contract[typeof command][1]>,
  ): void {
    const commandSubject = this.ensureDispatchSubject<Contract>(command).asObservable();
    commandSubject.subscribe(({ payload, subject }) => {
      handler((result?: Contract[typeof command][1]) => {
        subject.next(result);
        subject.complete();
      }, payload);
    });

    this.logger.info('handle$', `Registered handler fo "${command}"`);
  }

  private ensureDispatchSubject<Contract extends EventBusContract>(
    command: EventBusCommand,
  ): EventBusDispatchSubject<Contract[typeof command][0], Contract[typeof command][1]> {
    if (!this.dispatchSubjectMap[command]) {
      this.dispatchSubjectMap[command] = new ReplaySubject<
        EventBusDispatchSubjectItem<Contract[typeof command][0], Contract[typeof command][1]>
      >(undefined, REPLAY_BUFFER_WINDOW_TIME);
      this.logger.info('ensureCommandSubject', `Created subject for "${command}"`);
    }
    return this.dispatchSubjectMap[command] as EventBusDispatchSubject<
      Contract[typeof command][0],
      Contract[typeof command][1]
    >;
  }
}
