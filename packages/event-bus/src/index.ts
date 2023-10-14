import { EventBus } from './event-bus';

export { type DispatchPayload } from './event-bus';
export { type EventBus };

export function attachEventBus(): void {
  if (!window.mfsEventBus) {
    window.mfsEventBus = new EventBus();
  }
}
