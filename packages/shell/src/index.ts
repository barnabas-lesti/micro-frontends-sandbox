import { attachEventBusToWindow } from './event-bus';
import { type GetStartupContextPayload, StartupContextService } from './startup-context';

export { type EventBus } from './event-bus';
export { loadMicroFrontend, loadMicroFrontends } from './micro-frontend-loader';

export const enum ShellCommand {
  GetStartupContext = 'shell:startup-context:get',
}

export interface ShellContract {
  [ShellCommand.GetStartupContext]: GetStartupContextPayload;
}

export function createShell(): void {
  attachEventBusToWindow();

  void StartupContextService.getInstance();
}
