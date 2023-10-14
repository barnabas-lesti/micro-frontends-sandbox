import { type RequestContract } from '@mfs/request-mfe';
import { type EventBus } from '@mfs/shell';

import { type RemoteConfigContract } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<RemoteConfigContract & RequestContract>;
  }
}
