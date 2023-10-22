import { type EventBus } from '@mfs/shell';
import { type TelemetryServiceContract } from '@mfs/svc-telemetry';

import { type PlatformServiceContract } from '.';

declare global {
  const mfsEventBus: EventBus<PlatformServiceContract & TelemetryServiceContract>;
}
