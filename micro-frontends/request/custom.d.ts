import { type EventBus } from '@wrs-packages/event-bus/types';
import { type StartupConfig } from '@wrs-packages/startup-config/types';

declare global {
  interface Window {
    wrsEventBus?: EventBus;
    wrsStartupConfig?: StartupConfig;
  }
}
