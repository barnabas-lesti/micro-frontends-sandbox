import { type RequestContract } from '@mfs-micro-frontends/request';
import { type EventBus } from '@mfs-packages/event-bus';

import { type RemoteConfigContract } from './src/remote-config.contract';

declare global {
  interface Window {
    mfsEventBus?: EventBus<RemoteConfigContract & RequestContract>;
  }
}
