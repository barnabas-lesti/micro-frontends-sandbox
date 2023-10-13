import { type RemoteConfigContract } from '@mfs/config-mfe/contract';
import { type PlatformContract } from '@mfs/platform-mfe/contract';
import { type RequestContract } from '@mfs/request-mfe/contract';
import { type EventBus, type StartupConfig } from '@mfs/shell';

declare global {
  interface Window {
    mfsEventBus: EventBus<RemoteConfigContract & RequestContract & PlatformContract>;
    mfsStartupConfig: StartupConfig;
  }
}
