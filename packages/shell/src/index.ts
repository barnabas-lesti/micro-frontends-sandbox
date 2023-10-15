import { attachEventBusToWindow } from './event-bus';
import { attachStartupConfigToWindow } from './startup-config';

export { type DispatchPayload, type EventBus } from './event-bus';
export { type StartupConfig } from './startup-config';

export function createShell(): void {
  attachStartupConfigToWindow();
  attachEventBusToWindow();
}
