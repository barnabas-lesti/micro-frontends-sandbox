import { type EventBus } from '@mfs-packages/event-bus';
import { type StartupConfig } from '@mfs-packages/startup-config';

import { type RequestContract } from './src';

declare global {
  const mfsEventBus: EventBus<RequestContract>;
  const mfsStartupConfig: StartupConfig;
}
