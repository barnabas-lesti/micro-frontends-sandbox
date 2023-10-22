import { type EventBus } from '@mfs/shell';

import { type TelemetryServiceContract } from '.';

declare global {
  const mfsEventBus: EventBus<TelemetryServiceContract>;
}
