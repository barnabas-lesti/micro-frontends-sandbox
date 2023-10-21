import { ReplaySubject } from 'rxjs';

import { createLogger, unblockThread } from '@mfs/utility';

import { loadMicroFrontend } from '../micro-frontend-loader';
import { REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME } from './event-bus.const';
import { type DispatchSubject, type DispatchSubjectMap, type Listener } from './event-bus.types';

export class EventBus<Contracts> {
  private readonly logger = createLogger('EventBus');
  private readonly dispatchSubjectMap: DispatchSubjectMap = {};
  private readonly loadedMicroFrontends: string[] = [];

  constructor() {
    this.logger.info('constructor');
  }

  /**
   * Dispatches a command with the given payload.
   * Also checks if the micro frontend for the command has been loaded yet and loads it if not.
   * @template Command - The type of command to dispatch.
   * @param {Command} command - The command to dispatch.
   * @param {Contracts[Command]} payload - The payload to send with the command.
   */
  dispatch<Command extends keyof Contracts & string>(command: Command, payload: Contracts[Command]) {
    this.logger.info('dispatch', command, payload);
    this.ensureDispatchSubject(command).next(payload);
    this.ensureMicroFrontend(command);
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
    this.ensureMicroFrontend(command);
    return unsubscribe;
  }

  private ensureDispatchSubject<Payload>(command: string): DispatchSubject<Payload> {
    if (!this.dispatchSubjectMap[command]) {
      this.dispatchSubjectMap[command] = new ReplaySubject<unknown>(REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME);
    }
    return this.dispatchSubjectMap[command] as DispatchSubject<Payload>;
  }

  private ensureMicroFrontend(command: string): void {
    unblockThread(() => {
      const microFrontendName = this.getMicroFrontendName(command);
      if (microFrontendName !== 'shell' && !this.loadedMicroFrontends.includes(microFrontendName)) {
        this.loadedMicroFrontends.push(microFrontendName);
        loadMicroFrontend(microFrontendName);
      }
    });
  }

  private getMicroFrontendName(command: string): string {
    return command.split(':')[0];
  }
}
