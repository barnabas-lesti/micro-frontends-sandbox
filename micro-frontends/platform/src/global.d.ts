import { type EventBus } from '@mfs-packages/shell';

import { type PlatformContract } from './contract';

declare global {
  const mfsEventBus: EventBus<PlatformContract>;
}
