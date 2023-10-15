import { type RemoteConfigContract } from '@mfs-micro-frontends/config';
import { type PlatformContract } from '@mfs-micro-frontends/platform';
import { type RequestContract } from '@mfs-micro-frontends/request';
import { type EventBus, type StartupConfig } from '@mfs-packages/shell';

declare global {
  const mfsEventBus: EventBus<RemoteConfigContract & RequestContract & PlatformContract>;
  const mfsStartupConfig: StartupConfig;
}
