import { type EventBus } from '@mfs-packages/event-bus/types';

declare global {
  interface Window {
    mfsEventBus?: EventBus;
  }
}
