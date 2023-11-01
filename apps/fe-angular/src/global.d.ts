import { type EventBus, type StartupContext } from '@mfs/shell/contract';

declare global {
  const mfsEventBus: EventBus<unknown>;

  interface Window {
    mfsStartupContext: StartupContext;
  }
}
