import { RequestCommand, type RequestContract } from '@wrs-micro-frontends/request/types';
import { Logger } from '@wrs-packages/utility';

import { bootstrap } from './index.functions';

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
