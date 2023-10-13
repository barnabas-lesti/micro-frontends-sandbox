import { type EventBus } from '@mfs-packages/event-bus';

import { type PlatformContract } from './src/contract';

declare global {
  interface Window {
    mfsEventBus: EventBus<PlatformContract>;
  }
}
