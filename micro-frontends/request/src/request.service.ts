import { Logger } from '@mfs-packages/utility';

import { type GetAPIRequestPayload } from './request.contract';
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

  readonly apiBaseURL = window.mfsStartupConfig?.apiBaseURL;

  private constructor() {
    this.logger.info('constructor');

    window.mfsEventBus?.listen('request:getToAPI', async (payload) => {
      try {
        const data = await this.getToAPI(payload);
        payload.onSuccess?.(data);
      } catch (error) {
        payload.onError?.(error as Error);
      }
    });
  }

  async getToAPI<ResponseData>(payload: GetAPIRequestPayload): Promise<ResponseData> {
    if (!this.apiBaseURL) throw apiBaseURLRequiredError();

    const url = this.apiBaseURL + payload.path;
    const response = await fetch(url);
    const data = (await response.json()) as ResponseData;
    return data;
  }
}
