import { type EventBus } from '@mfs-packages/event-bus';
import { type StartupConfig } from '@mfs-packages/startup-config';

declare global {
  interface Window {
    mfsEventBus?: EventBus;
    mfsStartupConfig?: StartupConfig;
  }
}
