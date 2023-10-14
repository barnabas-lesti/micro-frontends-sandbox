import { createLogger } from '@mfs-packages/utility';

interface MicroFrontendOptions {
  name: string;
  version?: string;
}

/**
 * Loads the specified micro frontends by appending their scripts to the document head.
 * @param microFrontends An array of micro frontend names or options.
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
  return `micro-frontends/${mfeName}/dist/loader.js`;
}

function isMicroFrontendLoaded(mfeSource: string): boolean {
  return !!document.querySelector(`script[src="${mfeSource}"]`);
}
