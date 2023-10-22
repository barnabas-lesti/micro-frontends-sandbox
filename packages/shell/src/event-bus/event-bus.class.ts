import { ReplaySubject } from 'rxjs';

import { createLogger, unblockThread } from '@mfs/utility';

import { loadMicroFrontend } from '../micro-frontend-loader';
import { SHELL_COMMAND_PREFIX } from '../shell';
import { REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME } from './event-bus.const';
import { type DispatchSubject, type DispatchSubjectMap, type Listener } from './event-bus.types';

export class EventBus<Contracts> {
  private readonly logger = createLogger('EventBus');
  private readonly dispatchSubjectMap: DispatchSubjectMap = {};
  private readonly loadedMicroFrontends: string[] = [];

  constructor() {
    this.logger.debug('constructor');
  }

  dispatch<Command extends keyof Contracts & string>(command: Command, payload: Contracts[Command]): void {
    unblockThread(() => {
      this.logger.debug('dispatch', `"${command}"`, payload);
      this.ensureDispatchSubject(command).next(payload);
      this.ensureMicroFrontend(command);
    });
  }

  listen<Command extends keyof Contracts & string>(
    command: Command,
    listener: Listener<Contracts[Command]>,
  ): () => void {
    this.logger.debug('listen', `Registered listener for "${command}"`);
    const { unsubscribe } = this.ensureDispatchSubject<Contracts[Command]>(command).asObservable().subscribe(listener);
    unblockThread(() => this.ensureMicroFrontend(command));
    return unsubscribe;
  }

  private ensureDispatchSubject<Payload>(command: string): DispatchSubject<Payload> {
    if (!this.dispatchSubjectMap[command]) {
      this.dispatchSubjectMap[command] = new ReplaySubject<unknown>(REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME);
    }
    return this.dispatchSubjectMap[command] as DispatchSubject<Payload>;
  }

  private ensureMicroFrontend<Command extends keyof Contracts & string>(command: Command): void {
    const microFrontendName = this.getMicroFrontendName(command);
    if (microFrontendName !== SHELL_COMMAND_PREFIX && !this.loadedMicroFrontends.includes(microFrontendName)) {
      this.loadedMicroFrontends.push(microFrontendName);
      loadMicroFrontend(microFrontendName);
    }
  }

  private getMicroFrontendName(command: string): string {
    return command.split(':')[0];
  }
}
