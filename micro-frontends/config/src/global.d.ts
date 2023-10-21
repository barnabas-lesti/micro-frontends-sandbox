import { type RequestMFEContract } from '@mfs-micro-frontends/request/types';
import { type EventBus } from '@mfs-packages/shell';

import { type ConfigMFEContract } from './types';

declare global {
  const mfsEventBus: EventBus<ConfigMFEContract & RequestMFEContract>;
}
