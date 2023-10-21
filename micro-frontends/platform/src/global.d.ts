import { type EventBus } from '@mfs-packages/shell/contract';

import { type PlatformContract } from './contract';

declare global {
  const mfsEventBus: EventBus<PlatformContract>;
}
