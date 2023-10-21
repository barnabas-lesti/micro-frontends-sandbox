import { type EventBus } from '@mfs/shell';

import { type PlatformServiceContract } from '.';

declare global {
  const mfsEventBus: EventBus<PlatformServiceContract>;
}
