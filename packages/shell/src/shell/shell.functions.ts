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

export function loadMicroFrontends(microFrontends: string[]): void {
  const logInfo = (message: string, data?: unknown) => new Logger('shell').info('loadMicroFrontends', message, data);
  logInfo('Loading micro frontends...', microFrontends);
  for (const mfeName of microFrontends) {
    appendMicroFrontendScript(mfeName);
  }
  logInfo('Micro frontends loaded.');
}

function appendMicroFrontendScript(mfeName: string): void {
  const mfeSource = createMicroFrontendSource(mfeName);
  if (!isMicroFrontendLoaded(mfeSource)) {
    const script = document.createElement('script');
    script.setAttribute('src', mfeSource);
    script.setAttribute('defer', '');
    document.head.appendChild(script);
  }
}

function createMicroFrontendSource(mfeName: string): string {
  return `micro-frontends/${mfeName}/dist/loader.js`;
}

function isMicroFrontendLoaded(mfeSource: string): boolean {
  return !!document.querySelector(`script[src="${mfeSource}"]`);
}

async function createEventBus(): Promise<void> {
  window.mfsEventBus = new EventBus();
}

async function createStartupConfig(): Promise<void> {
  window.mfsStartupConfig = STARTUP_CONFIG_MOCK;
}
