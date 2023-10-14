import { type EventBus } from '@mfs/event-bus';
import { type RequestContract } from '@mfs/request-mfe';
import { type Utilities } from '@mfs/utility';

import { type RemoteConfigContract } from './src';

declare global {
  const mfsEventBus: EventBus<RemoteConfigContract & RequestContract>;
  const mfsUtilities: Utilities;
}
