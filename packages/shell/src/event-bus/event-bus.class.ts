import { ReplaySubject } from 'rxjs';

import { log, unblockThread } from '@mfs/utility';

import { ShellCommand } from '..';
import { REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME } from './event-bus.const';
import { type DispatchSubject, type DispatchSubjectMap, type Listener } from './event-bus.types';

export class EventBus<Contracts> {
  private readonly dispatchSubjectMap: DispatchSubjectMap = {};

  constructor() {
    log({ source: ['shell', 'EventBus', 'constructor'] });
  }

  dispatch<Command extends keyof Contracts & string>(command: Command, payload: Contracts[Command]): void {
    unblockThread(() => {
      log({ source: ['shell', 'EventBus', 'dispatch'], message: `"${command}"`, data: payload });
      this.ensureDispatchSubject(command).next(payload);
      this.ensureDispatchSubject(ShellCommand.AllCommands).next({ command, payload });
    });
  }

  listen<Command extends keyof Contracts & string>(
    command: Command,
    listener: Listener<Contracts[Command]>,
  ): () => void {
    log({ source: ['shell', 'EventBus', 'listen'], message: `Registered listener for "${command}"` });
    const { unsubscribe } = this.ensureDispatchSubject<Contracts[Command]>(command).asObservable().subscribe(listener);
    return unsubscribe;
  }

  private ensureDispatchSubject<Payload>(command: string): DispatchSubject<Payload> {
    if (!this.dispatchSubjectMap[command]) {
      this.dispatchSubjectMap[command] = new ReplaySubject<unknown>(REPLAY_BUFFER_SIZE, REPLAY_BUFFER_WINDOW_TIME);
    }
    return this.dispatchSubjectMap[command] as DispatchSubject<Payload>;
  }
}
