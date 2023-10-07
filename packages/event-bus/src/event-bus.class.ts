import { Logger } from '@wrs-packages/utility';
import { ReplaySubject } from 'rxjs';

import { REPLAY_BUFFER_WINDOW_TIME } from './event-bus.const';
import { type DispatchSubject, type DispatchSubjectMap, type Listener } from './event-bus.types';

export class EventBus {
  private logger = new Logger('EventBus');
  private dispatchSubjectMap: DispatchSubjectMap = {};

  constructor() {
    this.logger.info('constructor');
  }

  dispatch<Payload>(command: string, payload: Payload) {
    this.logger.info('dispatch', command, payload);
    this.ensureDispatchSubject(command).next(payload);
  }

  listen<Payload>(command: string, listener: Listener<Payload>): () => void {
    const { unsubscribe } = this.ensureDispatchSubject<Payload>(command).asObservable().subscribe(listener);

    this.logger.info('listen', `Registered listener for "${command}"`);

    return unsubscribe;
  }

  private ensureDispatchSubject<Payload>(command: string): DispatchSubject<Payload> {
    if (!this.dispatchSubjectMap[command]) {
      this.dispatchSubjectMap[command] = new ReplaySubject<unknown>(undefined, REPLAY_BUFFER_WINDOW_TIME);
    }
    return this.dispatchSubjectMap[command] as DispatchSubject<Payload>;
  }
}
