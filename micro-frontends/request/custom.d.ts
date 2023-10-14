import { type EventBus } from '@mfs/event-bus';
import { type StartupConfig } from '@mfs/startup-config';

import { type RequestContract } from './src';

declare global {
  const mfsEventBus: EventBus<RequestContract>;
  const mfsStartupConfig: StartupConfig;
}
