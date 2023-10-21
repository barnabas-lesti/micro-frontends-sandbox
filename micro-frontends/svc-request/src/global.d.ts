import { type EventBus, type ShellContract } from '@mfs/shell/contract';

import { type RequestContract } from './contract';

declare global {
  const mfsEventBus: EventBus<ShellContract & RequestContract>;
}
