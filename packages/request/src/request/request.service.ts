import { ConfigCommand, type ConfigContract } from '@wrs/config/contract';
import { getRandomInteger } from '@wrs/utility';

import { RequestCommand, type RequestContract } from './request.contract';
import { type MakeAPIRequestPayload, type MakeAPIRequestResponse } from './request.types';

export class RequestService {
  private _baseURL: string | null = null;

  private static instance: RequestService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    document.wrsEventBus.handle<RequestContract<unknown, unknown>>(
      RequestCommand.MakeAPIRequest,
      async ({ resolve }, payload) => {
        const response = await this.makeAPIRequest(payload);
        resolve(response);
      },
    );
  }

  private async getBaseURL(): Promise<string> {
    if (this._baseURL === null) {
      const { baseURL } = await document.wrsEventBus.dispatch<ConfigContract>(ConfigCommand.Get);
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
