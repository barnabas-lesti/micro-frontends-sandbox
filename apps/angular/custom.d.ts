import { type EventBus } from '@mfs/shell';

declare global {
  const mfsEventBus: EventBus<unknown>;
}
