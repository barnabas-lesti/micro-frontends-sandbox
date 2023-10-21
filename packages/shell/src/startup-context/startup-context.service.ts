import { createLogger } from '@mfs/utility';

import { ShellCommand } from '../.';
import { type StartupContext } from './startup-context.types';

export class StartupContextService {
  private static _instance: StartupContextService | undefined;

  static getInstance(): StartupContextService {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private readonly logger = createLogger('StartupContextService');

  private constructor() {
    this.logger.info('constructor');

    window.mfsEventBus.listen(ShellCommand.GetStartupContext, (callback) => callback(this.getStartupContext()));
  }

  /**
   * Retrieves the startup context from the server.
   */
  getStartupContext(): StartupContext {
    return window.mfsStartupContext || {};
  }
}
