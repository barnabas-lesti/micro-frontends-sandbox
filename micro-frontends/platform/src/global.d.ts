import { type EventBus } from '@mfs-packages/shell';

import { type PlatformMFEContract } from './types';

declare global {
  const mfsEventBus: EventBus<PlatformMFEContract>;
}
