import { type EventBus } from './packages/shell/contract';

export {};

declare global {
  interface Window {
    wrsEventBus: EventBus;
  }
}
