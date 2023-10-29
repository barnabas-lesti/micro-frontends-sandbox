import { ShellCommand } from '@mfs/shell';
import { TelemetryServiceCommand } from '@mfs/svc-telemetry';

import { RequestServiceCommand } from '..';
import { apiURLRequiredError } from './request.errors';
import { type MakeAPIRequestPayload } from './request.types';

export class RequestService {
  private static _instance: RequestService | undefined;

  static getInstance(): RequestService {
    return this._instance || (this._instance = new this());
  }

  private _apiBaseURLPromise: Promise<string> | undefined;

  private constructor() {
    mfsEventBus.dispatch(TelemetryServiceCommand.Log, { source: ['svc-request', 'RequestService', 'constructor'] });

    mfsEventBus.listen(RequestServiceCommand.MakeAPIRequest, async (payload) => {
      const data = await this.makeAPIRequest(payload);
      payload.callback(data);
    });
  }

  /**
   * Makes an API request using the provided payload.
   * @param payload - The payload for the API request.
   * @returns A Promise that resolves with the response data.
   * @throws An error if the API base URL is not set.
   */
  async makeAPIRequest<ResponseData>(payload: MakeAPIRequestPayload): Promise<ResponseData> {
    const url = (await this.getAPIBaseURL()) + payload.path;
    const response = await fetch(url);
    const data = (await response.json()) as ResponseData;
    return data;
  }

  async getAPIBaseURL(): Promise<string> {
    if (!this._apiBaseURLPromise) {
      this._apiBaseURLPromise = new Promise((resolve) => {
        mfsEventBus.dispatch(ShellCommand.GetStartupContext, ({ apiURL }) => {
          if (!apiURL) throw apiURLRequiredError();
          resolve(apiURL);
        });
      });
    }
    return this._apiBaseURLPromise;
  }
}
