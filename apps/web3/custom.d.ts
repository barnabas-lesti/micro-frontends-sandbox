import { type RemoteConfigContract } from '@mfs/config-mfe';
import { type PlatformContract } from '@mfs/platform-mfe';
import { type RequestContract } from '@mfs/request-mfe';
import { type EventBus, type StartupConfig } from '@mfs/shell';

declare global {
  interface Window {
    mfsEventBus: EventBus<RemoteConfigContract & RequestContract & PlatformContract>;
    mfsStartupConfig: StartupConfig;
  }
}
