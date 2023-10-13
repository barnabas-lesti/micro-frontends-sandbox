import { type RequestContract } from '@mfs/request-mfe/contract';
import { type EventBus } from '@mfs/shell';

import { type RemoteConfigContract } from './src/contract';

declare global {
  interface Window {
    mfsEventBus: EventBus<RemoteConfigContract & RequestContract>;
  }
}
