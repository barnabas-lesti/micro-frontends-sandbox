import { EventBus } from './event-bus.class';

export class EventBusService {
  private static _instance: EventBusService;

  static getInstance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {}

  createEventBus(): EventBus {
    return new EventBus();
  }
}
