import { type EventBus } from '@mfs-packages/event-bus';
import { type RequestContract } from '@mfs-micro-frontends/request';

import { type RemoteConfigContract } from './src';

declare global {
  const mfsEventBus: EventBus<RemoteConfigContract & RequestContract>;
}
