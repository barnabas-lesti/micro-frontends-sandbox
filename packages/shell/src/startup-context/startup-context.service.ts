import { log } from '@mfs/utility';

import { ShellCommand } from '..';
import { type StartupContext } from './startup-context.interface';

export class StartupContextService {
  private static _instance: StartupContextService | undefined;

  static getInstance(): StartupContextService {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    log({ source: ['shell', 'StartupContextService', 'constructor'] });

    window.mfsEventBus.listen(ShellCommand.GetStartupContext, (callback) => callback(this.getStartupContext()));
  }

  /**
   * Retrieves the startup context from the server.
   */
  getStartupContext(): StartupContext {
    return window.mfsStartupContext || {};
  }
}
