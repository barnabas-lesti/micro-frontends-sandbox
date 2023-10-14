import { EventBus } from './event-bus.class';

export { type EventBus };
export { type DispatchPayload } from './event-bus.types';

export function attachEventBus(): void {
  if (!window.mfsEventBus) {
    window.mfsEventBus = new EventBus();
  }
}
