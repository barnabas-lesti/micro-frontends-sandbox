import { type RemoteConfigContract } from '@mfs-micro-frontends/config/contract';
import { type PlatformContract } from '@mfs-micro-frontends/platform/contract';
import { type RequestContract } from '@mfs-micro-frontends/request/contract';
import { type EventBus, type StartupConfig } from '@mfs-packages/shell';

declare global {
  interface Window {
    mfsEventBus: EventBus<RemoteConfigContract & RequestContract & PlatformContract>;
    mfsStartupConfig: StartupConfig;
  }
}
