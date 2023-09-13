import { getRandomInteger, resolveObservable } from '@wrs/lib-utility';
import { ConfigCommand, ConfigContract } from '@wrs/mfe-svc-config/public';
import { LoggingCommand, LoggingContract } from '@wrs/mfe-svc-telemetry/public';
import { type EventBus } from '@wrs/shell/public';
import { BehaviorSubject } from 'rxjs';

import { MakeAPIRequestPayload, RequestCommand, RequestContract } from './request.types';

export class RequestService {
  private eventBus: EventBus;
  private baseURL$ = new BehaviorSubject<string | null>(null);

  private static instance: RequestService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.eventBus = document['obgEventBus'];

    this.log('constructor');

    this.eventBus.dispatch<ConfigContract>(ConfigCommand.Get, {
      callback: (config) => this.baseURL$.next(config.baseURL),
    });

    this.eventBus.listen<RequestContract<unknown, unknown>>(RequestCommand.MakeAPIRequest, (payload) => {
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
    this.eventBus.dispatch<LoggingContract>(LoggingCommand.Info, {
      sourceId: RequestService.name,
      method,
      message,
      data,
    });
  }
}
