import { createShell } from '@mfs/shell';
import { delay, Logger } from '@mfs/utility';

import { MICRO_FRONTENDS } from './index.const';

export async function bootstrap(): Promise<void> {
  const logInfo = (message: string) => new Logger('index').info('bootstrap', message);

  await createShell();

  logInfo('Loading micro frontends...');

  for (const mfeName of MICRO_FRONTENDS) {
    const script = document.createElement('script');
    script.setAttribute('src', `micro-frontends/${mfeName}/dist/loader.js`);
    script.setAttribute('async', '');
    // script.setAttribute('type', 'module');
    delay(() => document.head.appendChild(script));
  }

  logInfo('Micro frontends loaded.');
}
