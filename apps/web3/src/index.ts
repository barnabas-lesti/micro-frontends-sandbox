import { delay, Logger } from '@wrs/utility';

const logger = new Logger('index');
const rootInfo = (message: string) => logger.info('root', message);

(async () => {
  rootInfo('Starting the application...');
  await bootstrap();

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

  bootstrapInfo('Loading micro frontends...');
  const loaders = await Promise.all([
    import('@wrs/telemetry/loader'),
    import('@wrs/request/loader'),
    import('@wrs/config/loader'),
  ]);
  await Promise.all(loaders.map((loader) => delay(() => loader.default())));
  bootstrapInfo('Micro frontends loaded.');
}
