import { type EventBus } from './packages/shell/public';

export {};

declare global {
  interface Document {
    wrsEventBus: EventBus;
  }
}
