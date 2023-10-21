import { type EventBus } from '@mfs/shell/contract';
import { type ConfigContract } from '@mfs/svc-config/contract';
import { type PlatformContract } from '@mfs/svc-platform/contract';
import { type RequestContract } from '@mfs/svc-request/contract';

declare global {
  const mfsEventBus: EventBus<ConfigContract & PlatformContract & RequestContract>;
}
