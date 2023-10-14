import { type EventBus, type StartupConfig } from '@mfs/shell';

declare global {
  interface Window {
    mfsEventBus: EventBus<unknown>;
    mfsStartupConfig: StartupConfig;
  }
}
