import shellLoader from '@wrs/shell/loader';
import configLoader from '@wrs/svc-config/loader';
import requestLoader from '@wrs/svc-request/loader';
import { RequestCommand, RequestContract } from '@wrs/svc-request/public';
import telemetryLoader from '@wrs/svc-telemetry/loader';
import { LoggingCommand, LoggingContract } from '@wrs/svc-telemetry/public';
import { getRandomInteger } from '@wrs/utility';

// Entrypoint of the app, needs to be sync:
shellLoader();

// Loading MFE-s async and with randomness to simulate network chunk loading:
window.setTimeout(telemetryLoader, getRandomInteger(100, 1000));
window.setTimeout(configLoader, getRandomInteger(100, 1000));
window.setTimeout(requestLoader, getRandomInteger(100, 1000));

const numberOfRequests = 5;

for (let i = 0; i < numberOfRequests; i++) {
  window.setTimeout(() => makeAPIRequest(), i * 200 + getRandomInteger(100, 1000));
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
