import { type EventBus } from '@mfs-packages/event-bus';
import { type StartupConfig } from '@mfs-packages/startup-config';

import { type RequestContract } from './src/request.contract';

declare global {
  interface Window {
    mfsEventBus?: EventBus<RequestContract>;
    mfsStartupConfig?: StartupConfig;
  }
}
