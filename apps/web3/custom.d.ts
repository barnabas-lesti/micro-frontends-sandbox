import { type PlatformContract } from '@mfs-micro-frontends/platform';
import { type RemoteConfigContract } from '@mfs-micro-frontends/remote-config';
import { type RequestContract } from '@mfs-micro-frontends/request';
import { type EventBus } from '@mfs-packages/event-bus';
import { type StartupConfig } from '@mfs-packages/startup-config';

declare global {
  interface Window {
    mfsEventBus?: EventBus<RemoteConfigContract & RequestContract & PlatformContract>;
    mfsStartupConfig?: StartupConfig;
  }
}
