import { getRandomInteger } from '@wrs/lib-utility';
import { ConfigCommand, ConfigContract } from '@wrs/mfe-svc-config/contract';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/contract';
import { type MicroFrontendService } from 'shell/public';

import { RequestCommand, RequestContract } from './request.contract';
import { MakeAPIRequestPayload, MakeAPIRequestResponse } from './request.types';

export class RequestService implements MicroFrontendService {
  private _baseURL: string | undefined;

  private static instance: RequestService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {}

  registerSubscriptions(): void {
    document.wrsEventBus.handle<RequestContract<unknown, unknown>>(
      RequestCommand.MakeAPIRequest,
      async ({ resolve }, payload) => {
        const response = await this.makeAPIRequest(payload);
        resolve(response);
      },
    );
  }

  private async getBaseURL(): Promise<string> {
    if (!this._baseURL) {
      const { baseURL } = await document.wrsEventBus.dispatch<ConfigContract>(ConfigCommand.Get);
      this._baseURL = baseURL;
    }
    return this._baseURL;
  }

  private async makeAPIRequest(payload: MakeAPIRequestPayload<unknown>): Promise<MakeAPIRequestResponse<unknown>> {
    const baseURL = await this.getBaseURL();
    return new Promise((resolve) => {
      const log = (message?: string) => this.log('makeAPIRequest', message);
      log();

      // TODO: implement logic
      log(`fetching from: ${baseURL + payload.apiPath}`);
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
