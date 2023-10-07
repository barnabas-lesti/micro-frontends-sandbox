import { type EventBus } from '@mfs-packages/event-bus/types';
import { type StartupConfig } from '@mfs-packages/startup-config/types';

declare global {
  interface Window {
    mfsEventBus?: EventBus;
    mfsStartupConfig?: StartupConfig;
  }
}
