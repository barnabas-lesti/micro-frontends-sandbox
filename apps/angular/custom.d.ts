import { type EventBus } from '@mfs-packages/shell/contract';

declare global {
  const mfsEventBus: EventBus<unknown>;
}
