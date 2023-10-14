import { type EventBus } from '@mfs/event-bus';
import { type StartupConfig } from '@mfs/startup-config';
import { type Utilities } from '@mfs/utility';

import { type RequestContract } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<RequestContract>;
    mfsStartupConfig: StartupConfig;
    mfsUtilities: Utilities;
  }
}
