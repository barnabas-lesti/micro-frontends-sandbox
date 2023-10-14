import { Logger } from '@mfs/utility';

import { EventBus } from '../event-bus';
import { STARTUP_CONFIG_MOCK } from '../startup-config';

/**
 * Creates an application shell by creating the EventBus and StartupConfig.
 * @returns A Promise that resolves when the shell is created.
 */
export async function createShell(): Promise<void> {
  const logInfo = (message: string) => new Logger('shell').info('createShell', message);
  logInfo('Creating EventBus...');
  await createEventBus();
  logInfo('EventBus created');
  logInfo('Creating StartupConfig...');
  await createStartupConfig();
  logInfo('StartupConfig created');
}

/**
 * Ensures that the specified micro frontends are loaded into the application.
 * @param microFrontends An array of micro frontend names to load.
 */
export function ensureMicroFrontends(microFrontends: string[]): void {
  const logInfo = (message: string, data?: unknown) => new Logger('shell').info('ensureMicroFrontends', message, data);
  logInfo('Loading micro frontends...', microFrontends);
  for (const mfeName of microFrontends) {
    if (!isMicroFrontendLoaded(createMicroFrontendSource(mfeName))) {
      appendMicroFrontendScript(mfeName);
    }
  }
  logInfo('Micro frontends loaded.');
}

function appendMicroFrontendScript(mfeName: string): void {
  const script = document.createElement('script');
  script.setAttribute('src', createMicroFrontendSource(mfeName));
  script.setAttribute('defer', '');
  document.head.appendChild(script);
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
