import { type EventBus, type ShellContract } from '@mfs/shell';

import { type RequestServiceContract } from '.';

declare global {
  const mfsEventBus: EventBus<ShellContract & RequestServiceContract>;
}
