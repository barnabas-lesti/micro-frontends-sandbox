import { Logger } from '@mfs/utility';

import { EventBus } from '../event-bus';
import { STARTUP_CONFIG_MOCK } from '../startup-config';

export async function createShell(): Promise<void> {
  const logInfo = (message: string) => new Logger('shell').info('createShell', message);
  logInfo('Creating EventBus...');
  await createEventBus();
  logInfo('EventBus created');
  logInfo('Creating StartupConfig...');
  await createStartupConfig();
  logInfo('StartupConfig created');
}

async function createEventBus(): Promise<void> {
  window.mfsEventBus = new EventBus();
}

async function createStartupConfig(): Promise<void> {
  window.mfsStartupConfig = STARTUP_CONFIG_MOCK;
}
