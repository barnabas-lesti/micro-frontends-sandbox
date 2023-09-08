/**
 * Simple Event Bus implementation - Singleton + Publisher/Subscriber pattern
 * public method for dispatching event and listening to it
 * options for replaying events: none, latest, all
 *
 * Buffering:
 * Event bus fills event buffer as handlers are subscribing asynchronously - it is up to handler to decide
 * if dispatched events are needed and upon subscribing to listen can replay them.
 * As soon as Event handler starts listening and potentionaly replays already dispatched events,
 * buffer for particular command is set to 'nobuffer' and no more events are buffered.
 * In case there is no listener subscription after  for particular commands - we set 'nolistener' and print warning;
 */

import {
  EventBusOptions,
  EventBusParams,
  Listener,
  ReplayType,
  SystemCommand,
  TypedFunctionCallback,
} from './event-bus.types';

// Event Bus Singleton instance
export class EventBus {
  private latestId = 0;

  // Buffering events for replay by late loaded event handlers
  private eventBuffer: Record<string, unknown[]> = {};

  // List of commands to check for listeners and garbage collector

  private bufferLimit = { maxEvents: 100 }; // How many dispatches are kept in buffer before garbage collected
  private toGarbageCollect: Record<string, number> = {};

  // All subscribers categorized by command name - each holding id for later unsubscribe
  // In case optimisation is needed setTimeout can be used to take care of each event subscribers
  private listeners: Record<string, Listener<TypedFunctionCallback<unknown>>[]> = {};

  private isDebugEnabled = this.params?.isDebugEnabled || false;

  constructor(private params?: EventBusParams) {}

  /**
   * Dispatches event
   * @param command string unique name
   * @param payload data based on contract for particular command
   */
  dispatch<T>(command: string, payload?: T) {
    this.log('dispatch', command, payload);
    this.notifySubscribers('*', {
      command,
      payload,
    });

    if (this.listeners[command]) {
      this.notifySubscribers(command, payload);
      return;
    }
    // In case there is no listener pushing into buffer
    if (!this.eventBuffer[command]) {
      this.eventBuffer[command] = [];
    }

    // tslint:disable-next-line:early-exit
    if (
      this.eventBuffer[command][0] !== SystemCommand.nobuffer &&
      this.eventBuffer[command][0] !== SystemCommand.nolistener
    ) {
      this.eventBuffer[command].push(payload);
      // Setting garbage collector for future check
      this.toGarbageCollect[command] = this.toGarbageCollect[command] ? this.toGarbageCollect[command] + 1 : 1;
      if (this.toGarbageCollect[command] > this.bufferLimit.maxEvents) {
        this.bufferGarbageCollection(command);
      }
    }
  }

  /**
   *
   * @param command string unique name
   * @param callback
   */
  listen<T>(command: string, callback: TypedFunctionCallback<T>, eventBusOptions?: EventBusOptions) {
    const id = this.generateId();
    if (!this.listeners[command]) {
      this.listeners[command] = [];
    }

    this.listeners[command].push({
      id,
      callback: callback as TypedFunctionCallback<unknown>,
    });

    // Handle replay
    const replay = eventBusOptions?.replay === undefined ? ReplayType.none : eventBusOptions?.replay;
    if (replay !== ReplayType.none) {
      const events = this.eventBuffer[command];
      if (events) {
        if (replay === ReplayType.latest) {
          // Replay last event
          callback(events.pop() as T);
        }
        if (replay === ReplayType.all) {
          // Replay All Events
          for (const ev of events) {
            callback(ev as T);
          }
        }
      }
    }
    // Remove garbage collection and set command to not get buffered as there is registered listener
    this.eventBuffer[command] = [SystemCommand.nobuffer];
    delete this.toGarbageCollect[command];

    return () => {
      this.unlisten(id, command);
    };
  }

  /**
   * Removes listener from subscribers
   * @param id generated id
   * @param command event category
   */
  private unlisten(id: string, command: string) {
    const newCommandListeners = [];
    this.log(this.listeners[command], id, command);
    for (const listener of this.listeners[command]) {
      if (listener.id !== id) {
        newCommandListeners.push(listener);
      }
    }
    this.listeners[command] = newCommandListeners;
    this.log(this.listeners[command]);
  }

  /**
   * For particular command notifies all subscribers
   * @param command Calls callbacks for given command
   * @param payload New values to provide to callbacks
   */
  private notifySubscribers<T>(command: string, payload: T) {
    this.log('notifySubscribers', this.listeners);
    const listeners = this.listeners[command];
    // tslint:disable-next-line:early-exit
    if (listeners) {
      for (const listener of listeners) {
        setTimeout(() => {
          // To avoid thread blocking
          listener.callback(payload);
        }, 0);
      }
    }
  }

  /**
   * Helper method to generate unique id
   * @returns unique id
   */
  private generateId() {
    this.latestId++;
    return this.latestId.toString();
  }

  /**
   * Helper method to detect and clean buffer for commands without listeners
   */
  private bufferGarbageCollection(command: string) {
    // Clear buffer and set nolistener to not buffer anymore for command
    this.eventBuffer[command] = [SystemCommand.nolistener];
    delete this.toGarbageCollect[command];
    console.warn(`
			Max buffer limit reached for "${command}", no listener was detected.\n
			Make sure listener is loaded in time.\n
			Clearing event bus buffer and ignoring "${command}" from now on!
		`);
  }

  private log(...args: unknown[]) {
    if (!this.isDebugEnabled) {
      return;
    }

    console.log(...args);
  }
}
