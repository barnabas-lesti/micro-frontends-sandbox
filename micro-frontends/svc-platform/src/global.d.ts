import { type EventBus } from '@mfs/shell/contract';
import { type TelemetryServiceContract } from '@mfs/svc-telemetry/contract';

import { type PlatformServiceContract } from './contract';

declare global {
  const mfsEventBus: EventBus<PlatformServiceContract & TelemetryServiceContract>;
}
