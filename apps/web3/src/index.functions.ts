import { EventBus } from '@wrs-packages/event-bus';
import { Logger } from '@wrs-packages/utility';

import { MICRO_FRONTENDS } from './index.const';

export async function bootstrap(): Promise<void> {
  const logInfo = (message: string) => new Logger('index').info('bootstrap', message);

  logInfo('Loading the application shell...');
  createEventBus();
  logInfo('Application shell loaded.');

  logInfo('Loading micro frontends...');
  await Promise.all(MICRO_FRONTENDS);
  // await Promise.all(loaders.map((loader) => delay(() => loader.default())));
  logInfo('Micro frontends loaded.');
}

function createEventBus(): void {
  window.wrsEventBus = new EventBus();
}
