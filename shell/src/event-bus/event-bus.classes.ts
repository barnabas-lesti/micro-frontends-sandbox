import { type FunctionWithPayload, unblockThread } from '@wrs/lib-utility';

import { EventBusEvent, EventBusEventListenerMap } from './event-bus.types';

export class EventBus {
  private eventListenerMap: EventBusEventListenerMap<unknown> = {};
  private unhandledEvents: EventBusEvent<unknown>[] = [];

  dispatch<Contract>(command: keyof Contract, payload?: Contract[typeof command]) {
    const commandAsString = command as string;

    const callback = this.eventListenerMap[commandAsString];
    if (!callback) {
      this.unhandledEvents.push({ command: commandAsString, payload });
      return;
    }

    unblockThread(() => callback(payload));
  }

  listen<Contract>(command: keyof Contract, callback: FunctionWithPayload<Contract[typeof command]>) {
    const commandAsString = command as string;

    if (this.eventListenerMap[commandAsString]) {
      throw new Error(`Listener already registered for command: "${commandAsString}".`);
    }
    this.eventListenerMap[commandAsString] = callback;

    const unhandledEventsForThisCommand = this.unhandledEvents.filter(({ command }) => command === commandAsString);
    for (const unhandledEvent of unhandledEventsForThisCommand) {
      unblockThread(() => callback(unhandledEvent.payload as Contract[typeof command]));
    }
    this.unhandledEvents = [...this.unhandledEvents.filter(({ command }) => command !== commandAsString)];
  }
}
