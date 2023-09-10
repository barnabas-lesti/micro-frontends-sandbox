import { type EventBus } from './shell/public';

export {};

declare global {
  interface Document {
    obgEventBus: EventBus;
  }
}
