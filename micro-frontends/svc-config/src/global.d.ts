import { type EventBus } from '@mfs/shell/contract';
import { type RequestContract } from '@mfs/svc-request/contract';

import { type ConfigContract } from './contract';

declare global {
  const mfsEventBus: EventBus<ConfigContract & RequestContract>;
}
