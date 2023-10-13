import { type EventBus } from '@mfs-packages/shell';

import { type PlatformContract } from './src/contract';

declare global {
  interface Window {
    mfsEventBus: EventBus<PlatformContract>;
  }
}
