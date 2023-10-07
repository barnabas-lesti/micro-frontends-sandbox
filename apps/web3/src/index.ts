import { RequestCommand, type RequestContract } from '@wrs-micro-frontends/request/types';
import { Logger } from '@wrs-packages/utility';
import { StartupConfigCommand, type StartupConfigContract } from 'micro-frontends/config/types';

import { bootstrap } from './index.functions';

const logger = new Logger('index');

(async () => {
  const logInfo = (message: string) => logger.info('root', message);

  logInfo('Starting the application...');
  await bootstrap();

  // Testing out the EventBus
  window.wrsEventBus?.dispatch<StartupConfigContract[StartupConfigCommand.Get]>(StartupConfigCommand.Get, {
    onSuccess: (startupConfig) => {
      console.log(startupConfig);
    },
  });

  window.wrsEventBus?.dispatch<RequestContract<null, null>[RequestCommand.GetAPI]>(RequestCommand.GetAPI, {
    path: '/test-get-api',
    onSuccess: (response) => {
      console.log(response);
    },
  });

  window.wrsEventBus?.dispatch<RequestContract<{ param1: number }, null>[RequestCommand.PostAPI]>(
    RequestCommand.PostAPI,
    {
      path: '/test-post-api',
      data: { param1: 10 },
      onSuccess: (response) => {
        console.log(response);
      },
    },
  );

  logInfo('Application started.');
})();
