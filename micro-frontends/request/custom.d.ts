import { type EventBus, type StartupConfig } from '@mfs-packages/shell';

import { type RequestContract } from './src';

declare global {
  const mfsEventBus: EventBus<RequestContract>;
  const mfsStartupConfig: StartupConfig;
}
