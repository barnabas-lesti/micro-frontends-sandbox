import { type ShellContract } from './contract';
import { type EventBus } from './event-bus';
import { type StartupContext } from './startup-context';

declare global {
  interface Window {
    mfsEventBus: EventBus<ShellContract>;
    mfsStartupContext: StartupContext | undefined;
  }
}
