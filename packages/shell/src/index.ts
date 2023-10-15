import { attachEventBusToWindow } from './event-bus';

export { type DispatchPayload, type EventBus } from './event-bus';

export function createShell(): void {
  attachEventBusToWindow();
}
