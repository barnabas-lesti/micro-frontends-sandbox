import { EventBus } from './src/event-bus/event-bus.classes';

export default function (): void {
  document.wrsEventBus = new EventBus();
}
