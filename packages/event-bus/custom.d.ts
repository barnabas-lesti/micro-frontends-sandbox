import { type Utilities } from '@mfs/utility';

import { type EventBus } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<unknown>;
    mfsUtilities: Utilities;
  }
}
