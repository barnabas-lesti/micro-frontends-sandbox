import { type EventBus } from '@mfs-packages/event-bus';
import { type StartupConfig } from '@mfs-packages/startup-config';

declare global {
  const mfsEventBus: EventBus<unknown>;
  const mfsStartupConfig: StartupConfig;
}
