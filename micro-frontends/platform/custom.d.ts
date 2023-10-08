import { type EventBus } from '@mfs-packages/event-bus';

declare global {
  interface Window {
    mfsEventBus?: EventBus;
  }
}
