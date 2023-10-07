import { StartupConfigCommand, type StartupConfigContract } from '@wrs-micro-frontends/config/types';
import { delay, Logger } from '@wrs-packages/utility';

import {
  type GetAPIRequestPayload,
  type PostAPIRequestPayload,
  RequestCommand,
  type RequestContract,
} from './request.contract';

export class RequestService {
  private static _instance: RequestService | undefined;

  static create(): RequestService {
    return this._instance || (this._instance = new this());
  }

  static destroy(): void {
    this._instance = undefined;
  }

  private logger = new Logger('RequestService');
  private _apiBaseURL: Promise<string> | undefined;

  private constructor() {
    this.logger.info('constructor');

    window.wrsEventBus?.listen<RequestContract<unknown, unknown>[RequestCommand.GetAPI]>(
      RequestCommand.GetAPI,
      async (payload) => this.getAPI(payload),
    );

    window.wrsEventBus?.listen<RequestContract<unknown, unknown>[RequestCommand.PostAPI]>(
      RequestCommand.PostAPI,
      async (payload) => this.postAPI(payload),
    );
  }

  async getAPI<ResponseData>(payload: GetAPIRequestPayload<ResponseData>): Promise<ResponseData> {
    const url = (await this.getAPIBaseURL()) + payload.path;

    // TODO: implement logic
    return delay(() => {
      const response = { method: 'GET', url } as ResponseData;
      payload.onSuccess?.(response);
      return response;
    });
  }

  async postAPI<RequestData, ResponseData>(
    payload: PostAPIRequestPayload<RequestData, ResponseData>,
  ): Promise<ResponseData> {
    const url = (await this.getAPIBaseURL()) + payload.path;

    // TODO: implement logic
    return delay(() => {
      const response = { method: 'POST', data: payload.data, url } as ResponseData;
      payload.onSuccess?.(response);
      return response;
    });
  }

  private async getAPIBaseURL(): Promise<string> {
    if (!this._apiBaseURL) {
      this._apiBaseURL = new Promise<string>((resolve) => {
        window.wrsEventBus?.dispatch<StartupConfigContract[StartupConfigCommand.Get]>(StartupConfigCommand.Get, {
          onSuccess: (startupConfig) => {
            resolve(startupConfig.apiBaseURL);
          },
        });
      });
    }

    return this._apiBaseURL;
  }
}
