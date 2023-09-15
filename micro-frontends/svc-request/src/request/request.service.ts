import { getRandomInteger } from '@wrs/lib-utility';
import { ConfigCommand, ConfigContract } from '@wrs/mfe-svc-config/contract';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/contract';

import { RequestCommand, RequestContract } from './request.contract';
import { MakeAPIRequestPayload, MakeAPIRequestResponse } from './request.types';

export class RequestService {
  private baseURL: string;

  private static instance: RequestService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.log('constructor');

    Promise.all([document.wrsEventBus.dispatch<ConfigContract>(ConfigCommand.Get)]).then(([config]) => {
      this.baseURL = config.baseURL;

      document.wrsEventBus.handle<RequestContract<unknown, unknown>>(
        RequestCommand.MakeAPIRequest,
        async ({ resolve }, payload) => {
          const response = await this.makeAPIRequest(payload);
          resolve(response);
        },
      );
    });
  }

  private async makeAPIRequest(payload: MakeAPIRequestPayload<unknown>): Promise<MakeAPIRequestResponse<unknown>> {
    return new Promise((resolve) => {
      const log = (message?: string) => this.log('makeAPIRequest', message);
      log();

      // TODO: implement logic
      log(`fetching from: ${this.baseURL + payload.apiPath}`);
      window.setTimeout(() => resolve({ status: 200, data: { hey: 'there' } }), getRandomInteger(100, 500));
    });
  }

  private log(method: string, message?: string, data?: unknown) {
    document.wrsEventBus.dispatch<LoggingContract>(LoggingCommand.Info, {
      sourceId: RequestService.name,
      method,
      message,
      data,
    });
  }
}
