import { type EventBus, type EventBusV2 } from '@wrs-packages/event-bus/types';

declare global {
  interface Window {
    wrsEventBus?: EventBus;
    wrsEventBusV2?: EventBusV2;
  }
}
