import { getRandomInteger } from '@wrs/lib-utility';
import { EventBus } from '@wrs/shell';
import configMicroapp from '@wrs/svc-config/src/global/microapp';
import { RequestCommands, SendRequestPayload } from '@wrs/svc-request';
import requestMicroapp from '@wrs/svc-request/src/global/microapp';
import { LoggingCommands, LogPayload } from '@wrs/svc-telemetry';
import telemetryMicroapp from '@wrs/svc-telemetry/src/global/microapp';

document['obgEventBus'] = new EventBus();

telemetryMicroapp();
configMicroapp();
requestMicroapp();

// window.setTimeout(() => ConfigService.Instance, getRandomInteger(100, 1000));
// window.setTimeout(() => RequestService.Instance, getRandomInteger(100, 1000));

const numberOfRequests = 5;

for (let i = 0; i < numberOfRequests; i++) {
  window.setTimeout(() => makeRequest(), i * 200 + getRandomInteger(100, 1000));
}

function makeRequest() {
  document['obgEventBus'].dispatch<SendRequestPayload<TestResponseData>>(RequestCommands.Send, (response) => {
    console.log('lofasz');
    log('makeRequest', '', response.data);
  });
}

function log(method: string, message?: string, data?: unknown) {
  document['obgEventBus'].dispatch<LogPayload>(LoggingCommands.Info, {
    sourceId: 'index',
    method,
    message,
    data,
  });
}

interface TestResponseData {
  somethings: string;
}
