import { type EventBus } from '@mfs-packages/shell';

import { type RequestContract, type RequestStartupConfig } from './src';

declare global {
  const mfsEventBus: EventBus<RequestContract>;
  const mfsStartupConfig: RequestStartupConfig | undefined;
}
