import { getRandomInteger, resolveObservable } from '@wrs/lib-utility';
import { ConfigCommand, ConfigContract } from '@wrs/mfe-svc-config/contract';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/contract';
import { BehaviorSubject } from 'rxjs';

import { RequestCommand, RequestContract } from './request.contract';
import { MakeAPIRequestPayload } from './request.types';

export class RequestService {
  private baseURL$ = new BehaviorSubject<string | null>(null);

  private static instance: RequestService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.log('constructor');

    document.wrsEventBus.dispatch<ConfigContract>(ConfigCommand.Get, {
      callback: (config) => this.baseURL$.next(config.baseURL),
    });

    document.wrsEventBus.handle<RequestContract<unknown, unknown>>(RequestCommand.MakeAPIRequest, (payload) => {
      this.makeAPIRequest(payload);
    });
  }

  private async makeAPIRequest(payload: MakeAPIRequestPayload<unknown, unknown>): Promise<void> {
    const log = (message?: string) => this.log('makeAPIRequest', message);
    log();

    // TODO: implement logic
    const baseURL = await resolveObservable(this.baseURL$);
    log(`fetching from: ${baseURL + payload.apiPath}`);
    window.setTimeout(() => payload.callback({ status: 200, data: { hey: 'there' } }), getRandomInteger(100, 500));
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
