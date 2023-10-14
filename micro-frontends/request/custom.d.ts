import { type EventBus, type StartupConfig } from '@mfs/shell';

import { type RequestContract } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<RequestContract>;
    mfsStartupConfig: StartupConfig;
  }
}
