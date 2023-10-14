import { type EventBus } from '@mfs/event-bus';
import { type RequestContract } from '@mfs/request-mfe';
import { type Utilities } from '@mfs/utility';

import { type RemoteConfigContract } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<RemoteConfigContract & RequestContract>;
    mfsUtilities: Utilities;
  }
}
