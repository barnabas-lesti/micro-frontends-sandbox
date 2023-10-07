import { Logger } from '@wrs-packages/utility';
import { ReplaySubject } from 'rxjs';

import { REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME } from './event-bus.const';
import { type DispatchSubject, type DispatchSubjectMap, type Listener } from './event-bus.types';

export class EventBus {
  private logger = new Logger('EventBus');
  private dispatchSubjectMap: DispatchSubjectMap = {};

  constructor() {
    this.logger.info('constructor');
  }

  dispatch<Contract>(command: keyof Contract & string, payload: Contract[typeof command]) {
    this.logger.info('dispatch', command, payload);
    this.ensureDispatchSubject(command).next(payload);
  }

  listen<Contract>(command: keyof Contract & string, listener: Listener<Contract[typeof command]>): () => void {
    const { unsubscribe } = this.ensureDispatchSubject<Contract[typeof command]>(command)
      .asObservable()
      .subscribe(listener);

    this.logger.info('listen', `Registered listener for "${command}"`);

    return unsubscribe;
  }

  private ensureDispatchSubject<Payload>(command: string): DispatchSubject<Payload> {
    if (!this.dispatchSubjectMap[command]) {
      this.dispatchSubjectMap[command] = new ReplaySubject<unknown>(REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME);
    }
    return this.dispatchSubjectMap[command] as DispatchSubject<Payload>;
  }
}
