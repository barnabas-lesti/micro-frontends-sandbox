import { type EventBus } from '@mfs/event-bus';
import { type Utilities } from '@mfs/utility';

import { type PlatformContract } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<PlatformContract>;
    mfsUtilities: Utilities;
  }
}
