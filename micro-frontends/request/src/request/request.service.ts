import { Logger } from '@mfs-packages/utility';

import { type MakeAPIRequestPayload, RequestCommand } from './request.contract';
import { apiBaseURLRequiredError } from './request.errors';

export class RequestService {
  private static _instance: RequestService | undefined;

  static create(): RequestService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private readonly logger = new Logger('RequestService');
  private readonly apiBaseURL = window.mfsStartupConfig.apiBaseURL;

  private constructor() {
    this.logger.info('constructor');

    window.mfsEventBus.listen(RequestCommand.MakeAPIRequest, async (payload) => {
      try {
        const data = await this.makeAPIRequest(payload);
        payload.onSuccess?.(data);
      } catch (error) {
        payload.onError?.(error as Error);
      }
    });
  }

  async makeAPIRequest<ResponseData>(payload: MakeAPIRequestPayload): Promise<ResponseData> {
    if (!this.apiBaseURL) throw apiBaseURLRequiredError();

    const url = this.apiBaseURL + payload.path;
    const response = await fetch(url);
    const data = (await response.json()) as ResponseData;
    return data;
  }
}
