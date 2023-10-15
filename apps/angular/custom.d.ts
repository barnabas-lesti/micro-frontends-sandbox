import { type EventBus } from '@mfs-packages/shell';

declare global {
  const mfsEventBus: EventBus<unknown>;
}
