import { type EventBus } from '@mfs-packages/event-bus';

import { type PlatformContract } from './src';

declare global {
  const mfsEventBus: EventBus<PlatformContract>;
}
