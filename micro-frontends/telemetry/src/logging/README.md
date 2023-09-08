# LoggingService

Logging logic handler service that listens to related events and performs logging.

Supports multiple log levels:

- Debug
- Info
- Warn
- Error

## Usage

```ts
import { EventBus } from 'obg-shell/event-bus/event-bus';
// Import the needed commands and types:
import { LoggingCommands, LogPayload } from 'svc-telemetry/public';

export class ConsumerService {
  // Set up the EventBus:
  private eventBus: EventBus;

  private constructor() {
    this.eventBus = document['obgEventBus'];
  }

  someFunction() {
    // In your function dispatch the appropriate LoggingCommand with the logging payload:
    this.eventBus.dispatch<LogPayload>(LoggingCommands.Info, {
      sourceId: ConsumerService.name, // Name of the source.
      method: 'someFunction', // Name of the function.
      message: '', // Message or Error object.
      data: { foo: 'bar' }, // Additional (optional) data.
    });
  }
}
```
