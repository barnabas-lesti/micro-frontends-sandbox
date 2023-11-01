import { type AccountAppContract } from '@mfs/app-account/types';
import { type EventBus, type StartupContext } from '@mfs/shell/contract';
import { type ConfigServiceContract } from '@mfs/svc-config/contract';
import { type PlatformServiceContract } from '@mfs/svc-platform/contract';
import { type RequestServiceContract } from '@mfs/svc-request/contract';
import { type TelemetryServiceContract } from '@mfs/svc-telemetry/contract';

declare global {
  const mfsEventBus: EventBus<
    TelemetryServiceContract &
      ConfigServiceContract &
      PlatformServiceContract &
      RequestServiceContract &
      AccountAppContract
  >;

  interface Window {
    mfsStartupContext: StartupContext;
  }
}
