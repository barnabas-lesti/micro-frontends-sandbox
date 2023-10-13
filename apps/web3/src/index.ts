import { Logger } from '@mfs/utility';

import { HomeService } from './home';
import { bootstrap } from './index.functions';

const logger = new Logger('index');

(async () => {
  const logInfo = (message: string) => logger.info('root', message);

  logInfo('Starting the application...');
  await bootstrap();

  void HomeService.getInstance();

  logInfo('Application started.');
})();
