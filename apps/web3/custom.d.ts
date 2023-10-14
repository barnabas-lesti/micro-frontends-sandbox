import { type RemoteConfigContract } from '@mfs-micro-frontends/config';
import { type PlatformContract } from '@mfs-micro-frontends/platform';
import { type RequestContract } from '@mfs-micro-frontends/request';
import { type EventBus } from '@mfs-packages/event-bus';
import { type StartupConfig } from '@mfs-packages/startup-config';

declare global {
  const mfsEventBus: EventBus<RemoteConfigContract & RequestContract & PlatformContract>;
  const mfsStartupConfig: StartupConfig;
}
