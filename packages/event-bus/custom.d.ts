import { type Utilities } from '@mfs/utility';

import { type EventBus } from './src';

declare global {
  const mfsUtilities: Utilities;

  interface Window {
    mfsEventBus: EventBus<unknown>;
  }
}
