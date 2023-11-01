import { type EventBus, type ShellContract } from '@mfs/shell/contract';
import { type TelemetryServiceContract } from '@mfs/svc-telemetry/contract';

import { type RequestServiceContract } from './contract';

declare global {
  const mfsEventBus: EventBus<ShellContract & RequestServiceContract & TelemetryServiceContract>;
}
