import { type EventBus } from '@mfs/shell/contract';

declare global {
  const mfsEventBus: EventBus<unknown>;
}
