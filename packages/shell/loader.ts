import { EventBusService } from './src/event-bus/event-bus.service';

export default function (): void {
  window.wrsEventBus = EventBusService.getInstance().createEventBus();
}
