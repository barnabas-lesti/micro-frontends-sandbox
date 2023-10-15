import { type EventBus, type StartupConfig } from '@mfs-packages/shell';

declare global {
  const mfsEventBus: EventBus<unknown>;
  const mfsStartupConfig: StartupConfig;
}
