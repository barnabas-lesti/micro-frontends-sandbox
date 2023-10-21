import { ReplaySubject } from 'rxjs';

import { createLogger, unblockThread } from '@mfs/utility';

import { REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME } from './event-bus.const';
import { type DispatchSubject, type DispatchSubjectMap, type Listener } from './event-bus.types';

export class EventBus<Contracts> {
  private readonly logger = createLogger('EventBus');
  private readonly dispatchSubjectMap: DispatchSubjectMap = {};

  constructor() {
    this.logger.info('constructor');
  }

  dispatch<Command extends keyof Contracts & string>(command: Command, payload: Contracts[Command]): void {
    unblockThread(() => {
      this.logger.info('dispatch', command, payload);
      this.ensureDispatchSubject(command).next(payload);
    });
  }

  /**
   * Registers a listener function for a given command.
   * Also checks if the micro frontend for the command has been loaded yet and loads it if not.
   * @template Command - The type of command to listen for.
   * @param {Command} command - The command to listen for.
   * @param {Listener<Contracts[Command]>} listener - The listener function to register.
   * @returns {() => void} - A function that can be called to unsubscribe the listener.
   */
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
