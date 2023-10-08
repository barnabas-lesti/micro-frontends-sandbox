import { type EventBus } from '@mfs-packages/event-bus';

import { type PlatformContract } from './src/platform.contract';

declare global {
  interface Window {
    mfsEventBus?: EventBus<PlatformContract>;
  }
}
