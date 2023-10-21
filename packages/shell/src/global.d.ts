import { type EventBus } from './event-bus';

declare global {
  interface Window {
    mfsEventBus: EventBus<unknown>;
  }
}
