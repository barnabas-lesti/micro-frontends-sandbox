import { type EventBus } from '@mfs/event-bus';
import { type StartupConfig } from '@mfs/startup-config';
import { type Utilities } from '@mfs/utility';

declare global {
  interface Window {
    mfsEventBus: EventBus<unknown>;
    mfsStartupConfig: StartupConfig;
    mfsUtilities: Utilities;
  }
}
