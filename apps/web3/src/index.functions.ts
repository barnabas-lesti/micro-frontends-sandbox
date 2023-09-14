import { RequestCommand, RequestContract } from '@wrs/mfe-svc-request/contract';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/contract';

import { TestResponseData } from './index.types';

export function makeAPIRequest() {
  const log = logFactory('index', 'makeAPIRequest');

  document.wrsEventBus.dispatch<RequestContract<undefined, TestResponseData>>(RequestCommand.MakeAPIRequest, {
    apiPath: '/hello',
    callback: (response) => {
      log('callback', response.data);
    },
  });
}

export function logFactory(sourceId: string, method: string) {
  return <T>(message?: string, data?: T) =>
    document.wrsEventBus.dispatch<LoggingContract>(LoggingCommand.Info, {
      sourceId,
      method,
      message,
      data,
    });
}
