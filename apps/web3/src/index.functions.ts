import { RequestCommand, RequestContract } from '@wrs/mfe-svc-request/contract';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/contract';

import { TestResponseData } from './index.types';

export async function makeAPIRequest() {
  const log = logFactory('index', 'makeAPIRequest');

  const response = await document.wrsEventBus.dispatch<RequestContract<void, TestResponseData>>(
    RequestCommand.MakeAPIRequest,
    {
      apiPath: '/hello',
    },
  );
  log('makeAPIRequest done', response);
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
