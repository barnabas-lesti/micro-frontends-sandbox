import { type ConfigMFEContract } from '@mfs-micro-frontends/config/types';
import { type PlatformMFEContract } from '@mfs-micro-frontends/platform/types';
import { type RequestMFEContract } from '@mfs-micro-frontends/request/types';
import { type EventBus } from '@mfs-packages/shell';

declare global {
  const mfsEventBus: EventBus<ConfigMFEContract & PlatformMFEContract & RequestMFEContract>;
}
