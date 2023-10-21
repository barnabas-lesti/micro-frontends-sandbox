import { createLogger } from '@mfs/utility';

import { type MicroFrontendOptions } from './micro-frontend-loader.types';

/**
 * Loads a micro frontend if it hasn't been loaded yet.
 * @param microFrontend - The name of the micro frontend or an object containing its name and options.
 */
export function loadMicroFrontend(microFrontend: string | MicroFrontendOptions): void {
  const logInfo = createLogger('MicroFrontendLoader').createMethodLogger('requireMicroFrontends');
  const name = typeof microFrontend === 'string' ? microFrontend : microFrontend.name;
  if (!isMicroFrontendLoaded(createMicroFrontendSource(name))) {
    appendMicroFrontendScript(name);
    logInfo(`Loaded micro frontend: "${name}"`);
  }
}

function appendMicroFrontendScript(mfeName: string): void {
  const script = document.createElement('script');
  script.setAttribute('src', createMicroFrontendSource(mfeName));
  script.setAttribute('defer', '');
  document.head.appendChild(script);
}

function createMicroFrontendSource(mfeName: string): string {
  return `micro-frontends/${mfeName}/dist/index.js`;
}

function isMicroFrontendLoaded(mfeSource: string): boolean {
  return !!document.querySelector(`script[src="${mfeSource}"]`);
}
