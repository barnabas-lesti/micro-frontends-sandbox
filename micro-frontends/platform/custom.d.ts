import { type EventBus } from '@mfs/event-bus';

import { type PlatformContract } from './src';

declare global {
  const mfsEventBus: EventBus<PlatformContract>;
}
