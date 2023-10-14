/**
 * Ensures that the specified micro frontends are loaded into the application.
 * @param microFrontends An array of micro frontend names to load.
 */
export function ensureMicroFrontends(microFrontends: string[]): void {
  const logInfo = mfsUtilities.createLogger('MicroFrontendLoader').createMethodLogger('ensureMicroFrontends');
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
