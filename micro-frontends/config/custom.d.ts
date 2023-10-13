import { type RequestContract } from '@mfs-micro-frontends/request/contract';
import { type EventBus } from '@mfs-packages/event-bus';

import { type RemoteConfigContract } from './src/contract';

declare global {
  interface Window {
    mfsEventBus: EventBus<RemoteConfigContract & RequestContract>;
  }
}
