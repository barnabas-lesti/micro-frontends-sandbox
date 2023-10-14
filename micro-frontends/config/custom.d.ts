import { type EventBus } from '@mfs/event-bus';
import { type RequestContract } from '@mfs/request-mfe';

import { type RemoteConfigContract } from './src';

declare global {
  const mfsEventBus: EventBus<RemoteConfigContract & RequestContract>;
}
