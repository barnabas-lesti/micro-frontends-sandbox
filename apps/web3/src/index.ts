import { createShell } from '@mfs/shell';
import { createLogger } from '@mfs/utility';

import { HomeService } from './home';

const logger = createLogger('index');

(async () => {
  const log = logger.createMethodLogger('root');

  log('Starting the application...');
  await createShell();

  void HomeService.getInstance();

  log('Application started.');
})();
