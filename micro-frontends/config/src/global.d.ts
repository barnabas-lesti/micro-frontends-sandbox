import { type RequestContract } from '@mfs-micro-frontends/request/contract';
import { type EventBus } from '@mfs-packages/shell';

import { type ConfigContract } from './contract';

declare global {
  const mfsEventBus: EventBus<ConfigContract & RequestContract>;
}
