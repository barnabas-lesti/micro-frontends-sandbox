import { EventBus } from './src/event-bus/event-bus.classes';

export default function () {
  document.wrsEventBus = new EventBus();
}
