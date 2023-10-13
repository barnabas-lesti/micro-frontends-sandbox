import { EventBus } from '@mfs-packages/shell';
import { Logger } from '@mfs-packages/utility';

import { MICRO_FRONTENDS, STARTUP_CONFIG } from './index.const';

export async function bootstrap(): Promise<void> {
  const logInfo = (message: string) => new Logger('index').info('bootstrap', message);

  logInfo('Loading the application shell...');
  createStartupConfig();
  createEventBus();
  logInfo('Application shell loaded.');

  logInfo('Loading micro frontends...');
  await Promise.all(MICRO_FRONTENDS);
  logInfo('Micro frontends loaded.');
}

function createEventBus(): void {
  window.mfsEventBus = new EventBus();
}

function createStartupConfig(): void {
  window.mfsStartupConfig = STARTUP_CONFIG;
}
