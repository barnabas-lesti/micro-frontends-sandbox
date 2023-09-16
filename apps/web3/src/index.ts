import { getRandomInteger } from '@wrs/lib-utility';
import { MicroFrontendService } from 'shell/public';

import { makeAPIRequest } from './index.functions';

(async () => {
  await bootstrap();

  const numberOfRequests = 10;
  for (let i = 0; i < numberOfRequests; i++) {
    window.setTimeout(() => makeAPIRequest(), getRandomInteger(100, 1000));
  }
})();

async function bootstrap(): Promise<void> {
  // Initialize the shell.
  const shellLoader = await import('@wrs/shell/loader');
  shellLoader.default();

  // Load required micro frontends (MFE-s).
  const loaders = await Promise.all([
    import('@wrs/mfe-svc-telemetry/loader'),
    import('@wrs/mfe-svc-request/loader'),
    import('@wrs/mfe-svc-config/loader'),
  ]);

  // Load service instances via the MFE loader function.
  const serviceInstances: MicroFrontendService[] = [];
  for (const loader of loaders) {
    const loadedServiceInstances: MicroFrontendService[] = loader.default();
    serviceInstances.push(...loadedServiceInstances);
  }

  // Register service subscriptions.
  for (const serviceInstance of serviceInstances) {
    serviceInstance.registerSubscriptions?.();
  }

  // Initialize the services.
  for (const serviceInstance of serviceInstances) {
    serviceInstance.initialize?.();
  }
}
