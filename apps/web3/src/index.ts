import { getRandomInteger } from '@wrs/lib-utility';

import { makeAPIRequest } from './index.functions';

bootstrap(() => {
  const numberOfRequests = 10;

  for (let i = 0; i < numberOfRequests; i++) {
    window.setTimeout(() => makeAPIRequest(), getRandomInteger(100, 1000));
  }
});

function bootstrap(callback: () => void): void {
  import('@wrs/shell/loader').then((shellLoader) => {
    shellLoader.default();

    callback();

    import('@wrs/mfe-svc-telemetry/loader').then((loader) => loader.default());
    import('@wrs/mfe-svc-request/loader').then((loader) => loader.default());
    import('@wrs/mfe-svc-config/loader').then((loader) => loader.default());
    import('@wrs/mfe-app-login/loader').then((loader) => loader.default());
    import('@wrs/mfe-app-registration/loader').then((loader) => loader.default());
    import('@wrs/mfe-app-account/loader').then((loader) => loader.default());
  });
}
