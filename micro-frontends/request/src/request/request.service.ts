import { RemoteConfigCommand, type RemoteConfigContract } from '@wrs-micro-frontends/config/contract';
import { getRandomInteger, Logger } from '@wrs-packages/utility';

import { RequestCommand, type RequestContract } from './request.types';
import { type MakeAPIRequestPayload, type MakeAPIRequestResponse } from './request.types';

export class RequestService {
  private static _instance: RequestService;

  static getInstance() {
    return this._instance || (this._instance = new this());
  }

  private logger = new Logger('RequestService');
  private _baseURL: string | null = null;

  private constructor() {
    this.logger.info('constructor');

    window.wrsEventBus.handle<RequestContract<unknown, unknown>>(
      RequestCommand.MakeAPIRequest,
      async (resolve, payload) => {
        const response = await this.makeAPIRequest(payload);
        resolve(response);
      },
    );
  }

  private async getBaseURL(): Promise<string> {
    if (this._baseURL === null) {
      const { baseURL } = await window.wrsEventBus.dispatchAsync<RemoteConfigContract>(RemoteConfigCommand.Get, null);
      this._baseURL = baseURL;
    }
    return this._baseURL;
  }

  private async makeAPIRequest(payload: MakeAPIRequestPayload<unknown>): Promise<MakeAPIRequestResponse<unknown>> {
    // TODO: implement logic
    void payload;
    const baseURL = await this.getBaseURL();
    void baseURL;
    return new Promise((resolve) => {
      window.setTimeout(() => resolve({ status: 200, data: { hey: 'there' } }), getRandomInteger(100, 500));
    });
  }
}
