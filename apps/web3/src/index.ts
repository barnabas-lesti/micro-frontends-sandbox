/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@wrs/utility';
// import { combineLatest, tap } from 'rxjs';

const logger = new Logger('index');
const rootInfo = (message: string) => logger.info('root', message);

(async () => {
  rootInfo('Starting the application...');
  await bootstrap();

  // const COMMAND_WITH_NO_PAYLOAD = 'index:withNoPayload';
  // const COMMAND_WITH_PAYLOAD = 'index:withPayload';
  // const payloadMock = { field: 'test', num: 10 };

  // Casual dispatch.
  // document.wrsEventBus
  //   .dispatch$<undefined, undefined>(COMMAND_WITH_NO_PAYLOAD)
  //   .subscribe((response) => console.log(response));
  // document.wrsEventBus
  //   .dispatch$<typeof payloadMock, number>(COMMAND_WITH_PAYLOAD, payloadMock)
  //   .subscribe((response) => console.log(response));

  // Casual multi dispatch.
  // combineLatest([
  //   document.wrsEventBus.dispatch$(COMMAND_WITH_NO_PAYLOAD).pipe(tap((response) => console.log(response))),
  //   document.wrsEventBus.dispatch$(COMMAND_WITH_NO_PAYLOAD).pipe(tap((response) => console.log(response))),
  // ]).subscribe();

  // Dispatch at some point in time.
  // delay(() => {
  //   document.wrsEventBus.dispatch$(COMMAND_WITH_NO_PAYLOAD).subscribe((response) => console.log(response));
  // });

  // Register handler at some point in time.
  // delay(() => {
  //   document.wrsEventBus.handle$(COMMAND_WITH_NO_PAYLOAD, (resolve) => {
  //     // TODO: doesn't work with just resolve();
  //     delay(() => resolve());
  //   });

  //   document.wrsEventBus.handle$(COMMAND_WITH_PAYLOAD, (resolve, payload) => {
  //     // TODO: doesn't work with just resolve();
  //     console.log(payload);
  //     delay(() => resolve((payload as any).field));
  //   });
  // });

  // yolo$.subscribe();
  // const numberOfRequests = 10;
  // for (let i = 0; i < numberOfRequests; i++) {
  //   window.setTimeout(() => makeAPIRequest(), getRandomInteger(100, 1000));
  // }
  rootInfo('Application started.');
})();

async function bootstrap(): Promise<void> {
  const bootstrapInfo = (message: string) => logger.info('bootstrap', message);

  bootstrapInfo('Loading the application shell...');
  const shellLoader = await import('@wrs/shell/loader');
  shellLoader.default();
  bootstrapInfo('Application shell loaded.');

  // bootstrapInfo('Loading micro frontends...');
  // const loaders = await Promise.all([
  //   import('@wrs/telemetry/loader'),
  //   import('@wrs/request/loader'),
  //   import('@wrs/config/loader'),
  // ]);
  // await Promise.all(loaders.map((loader) => delay(() => loader.default())));
  // bootstrapInfo('Micro frontends loaded.');
}
