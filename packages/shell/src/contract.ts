import { type GetStartupContextPayload } from './startup-context/startup-context.types';

export { type DispatchPayload, type EventBus } from './event-bus';

export const enum ShellCommand {
  GetStartupContext = 'shell:startupContext:get',
}

export interface ShellContract {
  [ShellCommand.GetStartupContext]: GetStartupContextPayload;
}
