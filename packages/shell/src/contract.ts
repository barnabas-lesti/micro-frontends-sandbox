import { type GetStartupContextPayload } from './startup-context/startup-context.types';

export { type DispatchPayload, type EventBus } from './event-bus';

export const enum ShellCommand {
  GetStartupContext = 'shell:startup-context:get',
}

export interface ShellContract {
  [ShellCommand.GetStartupContext]: GetStartupContextPayload;
}
