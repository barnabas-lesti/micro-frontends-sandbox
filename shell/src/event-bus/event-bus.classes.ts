import { logFactory, unblockThread } from './event-bus.functions';
import { EventBusContract, EventBusEvent, EventBusEventHandler, EventBusEventHandlersMap } from './event-bus.types';

export class EventBus {
  private eventHandlers: EventBusEventHandlersMap<unknown, unknown> = {};
  private unhandledEvents: EventBusEvent<unknown, unknown>[] = [];

  constructor() {
    logFactory('constructor')();
  }

  dispatch<Contract extends EventBusContract>(
    command: keyof Contract,
    payload?: Contract[typeof command][0],
  ): Promise<Contract[typeof command][1]> {
    const log = logFactory('dispatch');
    const commandAsString = command as string;

    log(commandAsString, payload);

    return new Promise<Contract[typeof command][1]>((resolve, reject) => {
      const handler = this.eventHandlers[commandAsString];
      const promise = { resolve, reject };
      if (handler) {
        unblockThread(() => handler(promise, payload));
      } else {
        this.unhandledEvents.push({ command: commandAsString, promise, payload });
        log(
          `Handler not yet available for command "${commandAsString}", ` +
            `pushed event to unhandled events. [${this.unhandledEvents.length}] in queue.`,
        );
      }
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

    const unhandledEventsForThisCommand = this.unhandledEvents.filter(({ command }) => command === commandAsString);
    for (const { promise, payload } of unhandledEventsForThisCommand) {
      unblockThread(() => handler(promise, payload as Contract[typeof command][0]));
    }
    this.unhandledEvents = [...this.unhandledEvents.filter(({ command }) => command !== commandAsString)];
    unhandledEventsForThisCommand.length &&
      log(`Processed [${unhandledEventsForThisCommand.length}] unhandled events for command "${commandAsString}".`);
  }
}
