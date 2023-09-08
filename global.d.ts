import { EventBus } from './shell';

export {};

declare global {
  interface Document {
    obgEventBus: EventBus;
  }
}
