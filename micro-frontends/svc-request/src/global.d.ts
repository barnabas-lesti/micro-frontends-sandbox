import { type EventBus, type ShellContract } from '@mfs/shell';
import { type TelemetryServiceContract } from '@mfs/svc-telemetry';

import { type RequestServiceContract } from '.';

declare global {
  const mfsEventBus: EventBus<ShellContract & RequestServiceContract & TelemetryServiceContract>;
}
