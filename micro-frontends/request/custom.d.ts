import { type EventBus, type StartupConfig } from '@mfs-packages/shell';

import { type RequestContract } from './src/contract';

declare global {
  interface Window {
    mfsEventBus: EventBus<RequestContract>;
    mfsStartupConfig: StartupConfig;
  }
}
