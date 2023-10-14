import { type EventBus } from '@mfs/event-bus';
import { type StartupConfig } from '@mfs/startup-config';

declare global {
  const mfsEventBus: EventBus<unknown>;
  const mfsStartupConfig: StartupConfig;
}
