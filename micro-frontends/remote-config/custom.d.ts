import { type EventBus } from '@wrs-packages/event-bus';

declare global {
  interface Window {
    wrsEventBus?: EventBus;
  }
}
