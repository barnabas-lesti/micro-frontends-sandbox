import { type LoadMicroFrontendServicePayload } from './micro-frontend-loader';
import { type AllCommandsPayload } from './shell';
import { type GetStartupContextPayload } from './startup-context';

export { type EventBus } from './event-bus';
export { type StartupContext } from './startup-context';

export const enum ShellCommand {
  AllCommands = '*',
  GetStartupContext = 'shell:startup-context:get',
  LoadMicroFrontendService = 'shell:micro-frontend-loader:load-service',
}

export interface ShellContract {
  [ShellCommand.AllCommands]: AllCommandsPayload;
  [ShellCommand.GetStartupContext]: GetStartupContextPayload;
  [ShellCommand.LoadMicroFrontendService]: LoadMicroFrontendServicePayload;
}
