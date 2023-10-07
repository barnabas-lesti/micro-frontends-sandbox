import { type EventBus } from './packages/event-bus';

export {};

declare global {
  interface Window {
    wrsEventBus: EventBus;
  }
}
