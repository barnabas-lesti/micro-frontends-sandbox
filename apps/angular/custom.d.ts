import { type EventBus } from '@mfs/event-bus';
import { type StartupConfig } from '@mfs/startup-config';
import { type Utilities } from '@mfs/utility';

declare global {
  const mfsEventBus: EventBus<unknown>;
  const mfsStartupConfig: StartupConfig;
  const mfsUtilities: Utilities;
}
