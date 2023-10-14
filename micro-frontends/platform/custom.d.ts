import { type EventBus } from '@mfs/shell';

import { type PlatformContract } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<PlatformContract>;
  }
}
