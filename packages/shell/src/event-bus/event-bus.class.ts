import { Logger } from '@mfs-packages/utility';
import { ReplaySubject } from 'rxjs';

import { REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME } from './event-bus.const';
import { type DispatchSubject, type DispatchSubjectMap, type Listener } from './event-bus.types';

export class EventBus<Contracts> {
  private readonly logger = new Logger('EventBus');
  private readonly dispatchSubjectMap: DispatchSubjectMap = {};

  constructor() {
    this.logger.info('constructor');
  }

  dispatch<Command extends keyof Contracts & string>(command: Command, payload: Contracts[Command]) {
    this.logger.info('dispatch', command, payload);
    this.ensureDispatchSubject(command).next(payload);
  }

  listen<Command extends keyof Contracts & string>(
    command: Command,
    listener: Listener<Contracts[Command]>,
  ): () => void {
    const { unsubscribe } = this.ensureDispatchSubject<Contracts[Command]>(command).asObservable().subscribe(listener);

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
