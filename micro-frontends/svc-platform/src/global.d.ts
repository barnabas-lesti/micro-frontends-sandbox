import { type EventBus } from '@mfs/shell/contract';

import { type PlatformContract } from './contract';

declare global {
  const mfsEventBus: EventBus<PlatformContract>;
}
