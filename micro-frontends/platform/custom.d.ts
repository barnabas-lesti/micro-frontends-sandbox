import { type EventBus } from '@wrs-packages/event-bus/types';

declare global {
  interface Window {
    wrsEventBus?: EventBus;
  }
}
