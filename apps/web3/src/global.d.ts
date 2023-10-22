import { type EventBus } from '@mfs/shell';
import { type ConfigServiceContract } from '@mfs/svc-config';
import { type PlatformServiceContract } from '@mfs/svc-platform';
import { type RequestServiceContract } from '@mfs/svc-request';
import { type TelemetryServiceContract } from '@mfs/svc-telemetry';

declare global {
  const mfsEventBus: EventBus<
    TelemetryServiceContract & ConfigServiceContract & PlatformServiceContract & RequestServiceContract
  >;
}
