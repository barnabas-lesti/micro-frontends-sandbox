import { logFactory, unblockThread } from './event-bus.functions';
import {
  type EventBusContract,
  type EventBusDispatchOptions,
  type EventBusEventHandler,
  type EventBusEventHandlersMap,
  type EventBusEventListener,
  type EventBusEventListenersMap,
} from './event-bus.types';

export class EventBus {
  private eventHandlers: EventBusEventHandlersMap<unknown, unknown> = {};
  private eventListeners: EventBusEventListenersMap<unknown> = {};

  constructor() {
    logFactory('constructor')();
  }

  dispatch<Contract extends EventBusContract>(
    command: keyof Contract,
    payload?: Contract[typeof command][0],
    options: EventBusDispatchOptions = { requireHandler: true },
  ): Promise<Contract[typeof command][1]> {
    const log = logFactory('dispatch');
    const commandAsString = command as string;

    log(commandAsString, payload);

    this.notifyListeners(commandAsString, payload);

    if (!options?.requireHandler) {
      return Promise.resolve(undefined);
    }

    const handler = this.eventHandlers[commandAsString];
    if (!handler) {
      return Promise.reject(`No handler available for command "${commandAsString}".`);
    }

    return new Promise<Contract[typeof command][1]>((resolve, reject) => {
      unblockThread(() => handler({ resolve, reject }, payload));
    });
  }

  handle<Contract extends EventBusContract>(
    command: keyof Contract,
    handler: EventBusEventHandler<Contract[typeof command][0], Contract[typeof command][1]>,
  ): void {
    const log = logFactory('handle');
    const commandAsString = command as string;

    if (this.eventHandlers[commandAsString]) {
      throw new Error(`Event handler already registered for command: "${commandAsString}".`);
    }

    this.eventHandlers[commandAsString] = handler;
    log(`Registered handler for command "${commandAsString}".`);
  }

  private notifyListeners(command: string, payload: unknown) {
    const listeners = this.eventListeners[command] || [];
    for (const listener of listeners) {
      unblockThread(() => listener(payload));
    }
  }

  listen<Contract extends EventBusContract>(
    command: keyof Contract,
    listener: EventBusEventListener<Contract[typeof command][0]>,
  ): void {
    const log = logFactory('listen');
    const commandAsString = command as string;

    (this.eventListeners[commandAsString] || (this.eventListeners[commandAsString] = [])).push(listener);
    log(`Registered listener for command "${commandAsString}".`);
  }
}
