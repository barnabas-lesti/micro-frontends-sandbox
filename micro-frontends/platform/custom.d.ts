import { type EventBus } from '@mfs-packages/shell';

import { type PlatformContract } from './src';

declare global {
  const mfsEventBus: EventBus<PlatformContract>;
}
