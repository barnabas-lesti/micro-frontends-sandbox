import { resolveObservable } from '@wrs/lib-utility';
import type { EventBus } from '@wrs/shell';
import { ConfigCommands, GetConfigPayload } from '@wrs/svc-config';
import { LoggingCommands, LogPayload } from '@wrs/svc-telemetry';
import { BehaviorSubject } from 'rxjs';

import { RequestCommands } from './request.contracts';
import { SendRequestResponse } from './request.types';

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

    this.eventBus.dispatch<GetConfigPayload>(ConfigCommands.Get, (config) => this.baseURL$.next(config.baseURL));

    this.eventBus.listen<SendRequestResponse<unknown>>(RequestCommands.Send, () => {
      this.makeRequest('/a');
    });
  }

  private async makeRequest(slug: string): Promise<void> {
    this.log('makeRequest');

    const baseURL = await resolveObservable(this.baseURL$);
    this.log('makeRequest', `fetch() ${baseURL + slug}`);
  }

  private log(method: string, message?: string, data?: unknown) {
    this.eventBus.dispatch<LogPayload>(LoggingCommands.Info, {
      sourceId: RequestService.name,
      method,
      message,
      data,
    });
  }
}
