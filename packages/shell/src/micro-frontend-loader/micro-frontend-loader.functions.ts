import { createLogger, stripSlashes } from '@mfs/utility';

import { MICRO_FRONTEND_LOADER_FILE_PATH } from './micro-frontend-loader.const';
import { microFrontendsRemoteURLRequiredError } from './micro-frontend-loader.errors';
import { type MicroFrontendOptions } from './micro-frontend-loader.types';

export function loadMicroFrontend(microFrontend: string | MicroFrontendOptions): void {
  const logInfo = createLogger('MicroFrontendLoader').createMethodLogger('loadMicroFrontend');
  const name = typeof microFrontend === 'string' ? microFrontend : microFrontend.name;
  if (!isMicroFrontendLoaded(createMicroFrontendSource(name))) {
    appendMicroFrontendScript(name);
    logInfo(`Loaded micro frontend: "${name}"`);
  }
}

export function loadMicroFrontends(microFrontends: Array<string | MicroFrontendOptions>): void {
  microFrontends.forEach(loadMicroFrontend);
}

function appendMicroFrontendScript(mfeName: string): void {
  const script = document.createElement('script');
  script.setAttribute('src', createMicroFrontendSource(mfeName));
  script.setAttribute('defer', '');
  document.head.appendChild(script);
}

function createMicroFrontendSource(mfeName: string): string {
  const { microFrontendsRemoteURL } = window.mfsStartupContext || {};
  if (!microFrontendsRemoteURL) throw microFrontendsRemoteURLRequiredError();
  return `${stripSlashes(microFrontendsRemoteURL)}/${mfeName}/${stripSlashes(MICRO_FRONTEND_LOADER_FILE_PATH)}`;
}

function isMicroFrontendLoaded(mfeSource: string): boolean {
  return !!document.querySelector(`script[src="${mfeSource}"]`);
}
