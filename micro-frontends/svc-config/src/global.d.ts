import { type EventBus } from '@mfs/shell/contract';
import { type RequestServiceContract } from '@mfs/svc-request/contract';
import { type TelemetryServiceContract } from '@mfs/svc-telemetry/contract';

import { type ConfigServiceContract } from './contract';

declare global {
  const mfsEventBus: EventBus<ConfigServiceContract & TelemetryServiceContract & RequestServiceContract>;
}
