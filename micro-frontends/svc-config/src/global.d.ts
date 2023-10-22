import { type EventBus } from '@mfs/shell';
import { type RequestServiceContract } from '@mfs/svc-request';
import { type TelemetryServiceContract } from '@mfs/svc-telemetry';

import { type ConfigServiceContract } from '.';

declare global {
  const mfsEventBus: EventBus<ConfigServiceContract & TelemetryServiceContract & RequestServiceContract>;
}
