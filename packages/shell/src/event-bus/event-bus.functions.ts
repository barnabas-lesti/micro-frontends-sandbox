import { EventBus } from './event-bus.class';

export function attachEventBusToWindow(): void {
  if (!window.mfsEventBus) {
    window.mfsEventBus = new EventBus();
  }
}
