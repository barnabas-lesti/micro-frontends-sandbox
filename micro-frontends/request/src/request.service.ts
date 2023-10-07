import { Logger } from '@wrs-packages/utility';

import { type GetAPIRequestPayload, type RequestContract } from './request.contract';
import { apiBaseURLRequiredError } from './request.errors';

export class RequestService {
  private static _instance: RequestService | undefined;

  static create(): RequestService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private logger = new Logger('RequestService');

  readonly apiBaseURL = window.wrsStartupConfig?.apiBaseURL;

  private constructor() {
    this.logger.info('constructor');

    window.wrsEventBus?.listen<RequestContract.GetToAPI<unknown>>('request:getToAPI', async (payload) =>
      this.getToAPI(payload),
    );
  }

  async getToAPI<ResponseData>(payload: GetAPIRequestPayload<ResponseData>): Promise<ResponseData> {
    if (!this.apiBaseURL) throw apiBaseURLRequiredError();

    const url = this.apiBaseURL + payload.path;
    const response = await fetch(url);
    const data = (await response.json()) as ResponseData;
    payload.onSuccess?.(data);
    return data;
  }
}
