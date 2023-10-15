import { createLogger } from '@mfs-packages/utility';

import { type MakeAPIRequestPayload, RequestCommand } from './request.contract';
import { apiBaseURLRequiredError } from './request.errors';

export class RequestService {
  private static _instance: RequestService | undefined;

  static getInstance(): RequestService {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private readonly logger = createLogger('RequestService');
  private readonly apiBaseURL = mfsStartupConfig?.apiBaseURL;

  private constructor() {
    this.logger.info('constructor');

    mfsEventBus.listen(RequestCommand.MakeAPIRequest, async (payload) => {
      try {
        const data = await this.makeAPIRequest(payload);
        payload.onSuccess?.(data);
      } catch (error) {
        payload.onError?.(error as Error);
      }
    });
  }

  /**
   * Makes an API request using the provided payload.
   * @param payload - The payload for the API request.
   * @returns A Promise that resolves with the response data.
   * @throws An error if the API base URL is not set.
   */
  async makeAPIRequest<ResponseData>(payload: MakeAPIRequestPayload): Promise<ResponseData> {
    if (!this.apiBaseURL) throw apiBaseURLRequiredError();

    const url = this.apiBaseURL + payload.path;
    const response = await fetch(url);
    const data = (await response.json()) as ResponseData;
    return data;
  }
}
