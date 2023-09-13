import { getRandomInteger } from '@wrs/lib-utility';
import loginLoader from '@wrs/mfe-app-login/loader';
import registrationLoader from '@wrs/mfe-app-registration/loader';
import authLoader from '@wrs/mfe-svc-auth/loader';
import configLoader from '@wrs/mfe-svc-config/loader';
import requestLoader from '@wrs/mfe-svc-request/loader';
import { RequestCommand, RequestContract } from '@wrs/mfe-svc-request/public';
import telemetryLoader from '@wrs/mfe-svc-telemetry/loader';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/public';
import shellLoader from '@wrs/shell/loader';

// Entrypoint of the app, needs to be sync:
shellLoader();

// Loading MFE-s async and with randomness to simulate network chunk loading:
window.setTimeout(loginLoader, getRandomInteger(100, 1000));
window.setTimeout(registrationLoader, getRandomInteger(100, 1000));
window.setTimeout(authLoader, getRandomInteger(100, 1000));
window.setTimeout(configLoader, getRandomInteger(100, 1000));
window.setTimeout(requestLoader, getRandomInteger(100, 1000));
window.setTimeout(telemetryLoader, getRandomInteger(100, 1000));

const numberOfRequests = 10;

for (let i = 0; i < numberOfRequests; i++) {
  window.setTimeout(() => makeAPIRequest(), getRandomInteger(100, 1000));
}

function makeAPIRequest() {
  const log = <T>(message?: string, data?: T) => _log('makeAPIRequest', message, data);

  document['obgEventBus'].dispatch<RequestContract<undefined, TestResponseData>>(RequestCommand.MakeAPIRequest, {
    apiPath: '/hello',
    callback: (response) => {
      log('callback', response.data);
    },
  });
}

function _log(method: string, message?: string, data?: unknown) {
  document['obgEventBus'].dispatch<LoggingContract>(LoggingCommand.Info, {
    sourceId: 'index',
    method,
    message,
    data,
  });
}

interface TestResponseData {
  somethings: string;
}
