import { EventBus } from './src/event-bus/event-bus.classes';

export default function () {
  document['obgEventBus'] = new EventBus();
}
