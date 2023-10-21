import { type EventBus } from '@mfs-packages/shell';

import { type RequestStartupConfig } from './services/request';
import { type RequestMFEContract } from './types';

declare global {
  const mfsEventBus: EventBus<RequestMFEContract>;
  const mfsStartupConfig: RequestStartupConfig | undefined;
}
