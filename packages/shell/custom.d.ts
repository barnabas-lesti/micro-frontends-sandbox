import { type EventBus } from './src';

declare global {
  interface Window {
    mfsEventBus: EventBus<unknown>;
  }
}
