import { type EventBus, type StartupContext } from '@mfs/shell';

declare global {
  const mfsEventBus: EventBus<unknown>;

  interface Window {
    mfsStartupContext: StartupContext;
  }
}
