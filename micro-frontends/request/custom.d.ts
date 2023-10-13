import { type EventBus, type StartupConfig } from '@mfs/shell';

import { type RequestContract } from './src/contract';

declare global {
  interface Window {
    mfsEventBus: EventBus<RequestContract>;
    mfsStartupConfig: StartupConfig;
  }
}
