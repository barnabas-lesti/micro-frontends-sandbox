import { type ConfigContract } from '@mfs-micro-frontends/config/contract';
import { type PlatformContract } from '@mfs-micro-frontends/platform/contract';
import { type RequestContract } from '@mfs-micro-frontends/request/contract';
import { type EventBus } from '@mfs-packages/shell';

declare global {
  const mfsEventBus: EventBus<ConfigContract & PlatformContract & RequestContract>;
}
