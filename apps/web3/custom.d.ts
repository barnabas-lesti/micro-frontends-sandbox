import { type RemoteConfigContract } from '@mfs/config-mfe';
import { type EventBus } from '@mfs/event-bus';
import { type PlatformContract } from '@mfs/platform-mfe';
import { type RequestContract } from '@mfs/request-mfe';
import { type StartupConfig } from '@mfs/startup-config';

declare global {
  const mfsEventBus: EventBus<RemoteConfigContract & RequestContract & PlatformContract>;
  const mfsStartupConfig: StartupConfig;
}
