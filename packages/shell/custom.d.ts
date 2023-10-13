import { type EventBus, type StartupConfig } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<unknown>;
    mfsStartupConfig: StartupConfig;
  }
}
