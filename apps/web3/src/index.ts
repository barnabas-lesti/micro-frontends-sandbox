import { createShell } from '@mfs/shell';
import { Logger } from '@mfs/utility';

import { HomeService } from './home';

const logger = new Logger('index');

(async () => {
  const logInfo = (message: string) => logger.info('root', message);

  logInfo('Starting the application...');
  await createShell();

  void HomeService.getInstance();

  logInfo('Application started.');
})();
