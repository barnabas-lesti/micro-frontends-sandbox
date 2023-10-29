import { attachEventBusToWindow } from './event-bus';
import { type LoadMicroFrontendPayload, MicroFrontendLoaderService } from './micro-frontend-loader';
import { type AllCommandsPayload } from './shell';
import { type GetStartupContextPayload, StartupContextService } from './startup-context';

export { EventBus } from './event-bus';
export { StartupContext } from './startup-context';

export const enum ShellCommand {
  AllCommands = '*',
  GetStartupContext = 'shell:startup-context:get',
  LoadMicroFrontend = 'shell:micro-frontend-loader:load',
}

export interface ShellContract {
  [ShellCommand.AllCommands]: AllCommandsPayload;
  [ShellCommand.GetStartupContext]: GetStartupContextPayload;
  [ShellCommand.LoadMicroFrontend]: LoadMicroFrontendPayload;
}

export function createShell(): void {
  attachEventBusToWindow();

  void StartupContextService.getInstance();
  void MicroFrontendLoaderService.getInstance();
}
