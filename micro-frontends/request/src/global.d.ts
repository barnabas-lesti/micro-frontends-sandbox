import { type EventBus } from '@mfs-packages/shell';

import { type RequestContract } from './contract';
import { type RequestStartupConfig } from './services/request';

declare global {
  const mfsEventBus: EventBus<RequestContract>;
  const mfsStartupConfig: RequestStartupConfig | undefined;
}
