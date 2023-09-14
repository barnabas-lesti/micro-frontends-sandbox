import { type FunctionWithPayload } from '@wrs/lib-utility';

import { logFactory, unblockThread } from './event-bus.functions';
import { EventBusEvent, EventBusEventListenerMap } from './event-bus.types';

export class EventBus {
  private eventListenerMap: EventBusEventListenerMap<unknown> = {};
  private unhandledEvents: EventBusEvent<unknown>[] = [];

  constructor() {
    logFactory('constructor')();
  }

  dispatch<Contract>(command: keyof Contract, payload?: Contract[typeof command]): void {
    const log = logFactory('dispatch');
    const commandAsString = command as string;

    log(commandAsString, payload);

    const callback = this.eventListenerMap[commandAsString];
    if (!callback) {
      this.unhandledEvents.push({ command: commandAsString, payload });
      log(
        `Handler not yet available for command "${commandAsString}", ` +
          `pushed event to unhandled events. [${this.unhandledEvents.length}] in queue.`,
      );
      return;
    }

    unblockThread(() => callback(payload));
  }

  handle<Contract>(command: keyof Contract, callback: FunctionWithPayload<Contract[typeof command]>): void {
    const log = logFactory('handle');
    const commandAsString = command as string;

    if (this.eventListenerMap[commandAsString]) {
      throw new Error(`Event handler already registered for command: "${commandAsString}".`);
    }

    this.eventListenerMap[commandAsString] = callback;
    log(`Registered handler for command "${commandAsString}".`);

    const unhandledEventsForThisCommand = this.unhandledEvents.filter(({ command }) => command === commandAsString);
    for (const unhandledEvent of unhandledEventsForThisCommand) {
      unblockThread(() => callback(unhandledEvent.payload as Contract[typeof command]));
    }
    this.unhandledEvents = [...this.unhandledEvents.filter(({ command }) => command !== commandAsString)];
    unhandledEventsForThisCommand.length &&
      log(`Processed [${unhandledEventsForThisCommand.length}] unhandled events for command "${commandAsString}".`);
  }
}
