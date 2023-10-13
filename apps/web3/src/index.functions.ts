import { createShell } from '@mfs/shell';
import { Logger } from '@mfs/utility';

import { MICRO_FRONTENDS } from './index.const';

export async function bootstrap(): Promise<void> {
  const logInfo = (message: string) => new Logger('index').info('bootstrap', message);

  await createShell();

  logInfo('Loading micro frontends...');
  await Promise.all(MICRO_FRONTENDS);
  logInfo('Micro frontends loaded.');
}
