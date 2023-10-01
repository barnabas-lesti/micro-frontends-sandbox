import { RequestCommand, type RequestContract } from '@wrs/request/contract';
import { delay, Logger } from '@wrs/utility';

import { MICRO_FRONTENDS } from './index.const';

const logger = new Logger('index');

(async () => {
  const logInfo = (message: string) => logger.info('root', message);

  logInfo('Starting the application...');
  await bootstrap();

  // Testing out the EventBus
  window.wrsEventBus
    .dispatch$<RequestContract<{ field: boolean }, object>>(RequestCommand.MakeAPIRequest, {
      apiPath: '/test',
      data: { field: false },
    })
    .subscribe();

  logInfo('Application started.');
})();

async function bootstrap(): Promise<void> {
  const logInfo = (message: string) => logger.info('bootstrap', message);

  logInfo('Loading the application shell...');
  const shellLoader = await import('@wrs/shell/loader');
  shellLoader.default();
  logInfo('Application shell loaded.');

  logInfo('Loading micro frontends...');
  const loaders = await Promise.all(MICRO_FRONTENDS);
  await Promise.all(loaders.map((loader) => delay(() => loader.default())));
  logInfo('Micro frontends loaded.');
}
