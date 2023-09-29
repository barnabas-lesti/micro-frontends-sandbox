import { delay } from '@wrs/utility';

(async () => {
  await bootstrap();

  // const numberOfRequests = 10;
  // for (let i = 0; i < numberOfRequests; i++) {
  //   window.setTimeout(() => makeAPIRequest(), getRandomInteger(100, 1000));
  // }
})();

async function bootstrap(): Promise<void> {
  // Initialize the shell.
  const shellLoader = await import('@wrs/shell/loader');
  shellLoader.default();

  // Load MFE-s with simulated delay.
  const loaders = await Promise.all([
    import('@wrs/telemetry/loader'),
    import('@wrs/request/loader'),
    import('@wrs/config/loader'),
  ]);
  await Promise.all(loaders.map((loader) => delay(() => loader.default())));
}
