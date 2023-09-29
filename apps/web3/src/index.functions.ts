import { RequestCommand, type RequestContract } from '@wrs/request/contract';
import { LoggingCommand, type LoggingContract } from '@wrs/telemetry/contract';

import { type TestResponseData } from './index.types';

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
