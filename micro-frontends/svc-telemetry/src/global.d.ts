import { type EventBus } from '@mfs/shell/contract';

import { type TelemetryServiceContract } from './contract';

declare global {
  const mfsEventBus: EventBus<TelemetryServiceContract>;
}
