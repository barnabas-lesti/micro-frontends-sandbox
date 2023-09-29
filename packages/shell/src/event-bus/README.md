# EventBus

- Global object with function to enable communication between different MFE-s.
- Function that can be used for communication:
  - Dispatch
  - Listen
  - Handle

## Functions

### Dispatch

- Function to used by consumer services to dispatch a command on the EventBus.
- Services responsible for the command **handle** these dispatched commands.
- Other consumers can **listen** to dispatched commands, but can't influence the outcome.
- Function arguments:
  - The command as the 1st argument.
  - Optional payload (like message to log, request object to perform HTTP request, etc.).
  - Optional EventBusDispatchOptions object as the last argument.
- There are 3 interfaces available:
  - **Callback based** that accepts a callback function as the argument after the optional payload.
  - **Promise based** that returns a promise that is resolved once the dispatch is done.
  - **Finite Observable based** that returns an observable that executes only once when the dispatch is done.

#### Callback based

```ts
document.wdsEventBus.dispatch('telemetry:logging:info', 'Message to log');
document.wdsEventBus.dispatch('config:get', null, (config) => {
  this.baseURL = config.baseURL;
});
```

#### Promise based

```ts
await document.wdsEventBus.dispatchAsync('telemetry:logging:info', 'Message to log');
const { baseURL } = await document.wdsEventBus.dispatchAsync('config:get');
```

#### Finite Observable based

```ts
document.wdsEventBus.dispatch$('telemetry:logging:info', 'Message to log');
document.wdsEventBus.dispatch$('config:get').pipe(
  tap((config) => {
    this.baseURL = config.baseURL;
  }),
);
```

### Listen

- Function that can be used by consumers to listen to **dispatched** commands on the EventBus.
- Listeners can't influence how the dispatch is resolved, that's the responsibility of the **handlers**.
- Function arguments:
  - The command to listen to as the 1st argument.
- There are 3 interfaces available:
  - **Callback based** that accepts a callback function as the argument after the command.
    - Return value of this interface is an `unlisten` function.
  - **Promise based** that returns a promise that is resolved once a dispatch happens.
    - Useful for OnLoaded like events, example: `config:loaded`
    - Because promises are finite, unsubscribing is not necessary.
  - **Observable based** that returns an observable that executes every time a dispatch is fired for the command.
    - Because this interface returns an Observable, the `.unsubscribe` method can be used to terminate the subscription.

#### Callback based

```ts
const unlisten = document.wdsEventBus.listen('auth:stateChanged', (isLoggedIn) => {
  // Handle state change in the consumer.
});
```

#### Promise based

```ts
await document.wdsEventBus.listenAsync('site:loaded');
// Do things after the site loaded.
```

#### Finite Observable based

```ts
const { unsubscribe } = document.wdsEventBus.dispatch$('auth:stateChanged').pipe(
  tap((isLoggedIn) => {
    // Handle state change in the consumer.
  }),
);
```

### Handle

- Function used by command owner services to handle **dispatches**.
- Handlers are required for all commands by default.
  - Consumer can provide the `{ requireHandler: false }` dispatch option to bypass this rule, when a dispatch is just to
    notify listeners (like in a case of a `site:loaded` event for example).
- Function arguments:
  - The command to listen to as the 1st argument.
  - Handler function as the second argument.
    - First argument is the resolve function that should be called once the dispatch handling is done.
    - Second argument is the optional payload provided by the dispatcher.
- There is only 1 interface available for this function, because promise and observable based handling is not applicable.

```ts
document.wdsEventBus.handle('telemetry:logging:info', (resolve, payload) => {
  // Perform logging logic based on the logging payload then resolve the dispatch.
  resolve();
});
document.wdsEventBus.handle('config:get', (resolve) => {
  // Lazy load the configuration then resolve the dispatch with the result.
  this.getConfig$().pipe(
    filter((config) => !!config),
    take(1),
    tap((config) => resolve(config)),
  );
});
```

## Type safety

- Make EventBus generic and accept Contracts.
- Have contracts added to the MFE \*.d.ts file (separated with a pipe).
- Infer the payload and result type based on the contract and commands.
- Create a `notify` function that doesn't require a handler to be created for a dispatch
  - Under the hood it will use dispatch but with the `requireHandler` flag set to `false`.
  - This can be used if a notification should be sent to `listeners`.
- Issue might come when multiple dispatches are sent and handler executes for example HTTP request to a server multiple
  times till the resource is loaded (config for example), try to find a solution for this.
