import { type EventBus } from '@mfs/event-bus';
import { type Utilities } from '@mfs/utility';

import { type PlatformContract } from './src';

declare global {
  const mfsEventBus: EventBus<PlatformContract>;
  const mfsUtilities: Utilities;
}
