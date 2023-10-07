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
  private apiBaseURL = 'https://run.mocky.io';

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
    const url = this.apiBaseURL + payload.path;
    const response = await fetch(url);
    const data = (await response.json()) as ResponseData;
    payload.onSuccess?.(data);
    return data;
  }

  async postAPI<RequestData, ResponseData>(
    payload: PostAPIRequestPayload<RequestData, ResponseData>,
  ): Promise<ResponseData> {
    const url = this.apiBaseURL + payload.path;

    // TODO: implement logic
    return delay(() => {
      const response = { method: 'POST', data: payload.data, url } as ResponseData;
      payload.onSuccess?.(response);
      return response;
    });
  }
}
