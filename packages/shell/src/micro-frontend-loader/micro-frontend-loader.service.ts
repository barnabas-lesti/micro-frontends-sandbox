import { log, stripSlashes } from '@mfs/utility';

import { ShellCommand } from '../contract';
import { SHELL_COMMAND_PREFIX } from '../shell';
import { MICRO_FRONTEND_SCRIPT_TYPE, MICRO_FRONTEND_SERVICE_LOADER_FILE_PATH } from './micro-frontend-loader.const';
import { microFrontendsURLRequiredError } from './micro-frontend-loader.errors';
import { type LoadMicroFrontendServicePayload } from './micro-frontend-loader.types';

export class MicroFrontendLoaderService {
  private static _instance: MicroFrontendLoaderService | undefined;

  static getInstance(): MicroFrontendLoaderService {
    return this._instance || (this._instance = new this());
  }

  private readonly loadedMicroFrontends: string[] = [];

  private constructor() {
    log({ source: ['shell', 'MicroFrontendLoaderService', 'constructor'] });

    window.mfsEventBus.listen(ShellCommand.LoadMicroFrontendService, (payload) =>
      this.loadMicroFrontendService(payload),
    );

    window.mfsEventBus.listen(ShellCommand.AllCommands, (payload) =>
      this.loadMicroFrontendServiceWithCommand(payload.command),
    );
  }

  loadMicroFrontendService(microFrontend: string | LoadMicroFrontendServicePayload): void {
    const name = typeof microFrontend === 'string' ? microFrontend : microFrontend.name;
    if (!this.isMicroFrontendLoaded(name)) {
      this.loadedMicroFrontends.push(name);
      this.appendMicroFrontendScript(name);
      log({ source: ['shell', 'MicroFrontendLoaderService', 'loadMicroFrontend'], message: `"${name}"` });
    }
  }

  private appendMicroFrontendScript(mfeName: string): void {
    const script = document.createElement('script');
    script.setAttribute('src', this.createMicroFrontendSource(mfeName));
    script.setAttribute('defer', '');
    script.setAttribute('type', MICRO_FRONTEND_SCRIPT_TYPE);
    document.head.appendChild(script);
  }

  private createMicroFrontendSource(mfeName: string): string {
    const { microFrontendsURL } = window.mfsStartupContext || {};
    if (!microFrontendsURL) throw microFrontendsURLRequiredError();

    return `${stripSlashes(microFrontendsURL)}/${mfeName}/${stripSlashes(MICRO_FRONTEND_SERVICE_LOADER_FILE_PATH)}`;
  }

  private isMicroFrontendLoaded(name: string): boolean {
    return (
      this.loadedMicroFrontends.includes(name) ||
      !!document.querySelector(`script[src="${this.createMicroFrontendSource(name)}"]`)
    );
  }

  private loadMicroFrontendServiceWithCommand(command: string): void {
    if (command !== ShellCommand.AllCommands && !command.startsWith(SHELL_COMMAND_PREFIX)) {
      this.loadMicroFrontendService(this.getMicroFrontendNameFromCommand(command));
    }
  }

  private getMicroFrontendNameFromCommand(command: string): string {
    return command.split(':')[0];
  }
}
