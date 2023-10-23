import { log, stripSlashes } from '@mfs/utility';

import { ShellCommand } from '..';
import { SHELL_COMMAND_PREFIX } from '../shell';
import { MICRO_FRONTEND_LOADER_FILE_PATH } from './micro-frontend-loader.const';
import { microFrontendsRemoteURLRequiredError } from './micro-frontend-loader.errors';
import { type LoadMicroFrontendPayload } from './micro-frontend-loader.types';

export class MicroFrontendLoaderService {
  private static _instance: MicroFrontendLoaderService | undefined;

  static getInstance(): MicroFrontendLoaderService {
    return this._instance || (this._instance = new this());
  }

  static destroyInstance(): void {
    this._instance = undefined;
  }

  private readonly loadedMicroFrontends: string[] = [];

  private constructor() {
    log({ sourceID: 'MicroFrontendLoaderService', method: 'constructor' });

    window.mfsEventBus.listen(ShellCommand.LoadMicroFrontend, (payload) => this.loadMicroFrontend(payload));

    window.mfsEventBus.listen(ShellCommand.AllCommands, (payload) => this.ensureMicroFrontend(payload.command));
  }

  loadMicroFrontend(microFrontend: string | LoadMicroFrontendPayload): void {
    const name = typeof microFrontend === 'string' ? microFrontend : microFrontend.name;
    if (!this.isMicroFrontendLoaded(this.createMicroFrontendSource(name))) {
      this.appendMicroFrontendScript(name);
      log({
        sourceID: 'MicroFrontendLoader',
        method: 'loadMicroFrontend',
        message: `"${name}"`,
      });
    }
  }

  private appendMicroFrontendScript(mfeName: string): void {
    const script = document.createElement('script');
    script.setAttribute('src', this.createMicroFrontendSource(mfeName));
    script.setAttribute('defer', '');
    document.head.appendChild(script);
  }

  private createMicroFrontendSource(mfeName: string): string {
    const { microFrontendsRemoteURL } = window.mfsStartupContext || {};
    if (!microFrontendsRemoteURL) throw microFrontendsRemoteURLRequiredError();
    return `${stripSlashes(microFrontendsRemoteURL)}/${mfeName}/${stripSlashes(MICRO_FRONTEND_LOADER_FILE_PATH)}`;
  }

  private isMicroFrontendLoaded(mfeSource: string): boolean {
    return !!document.querySelector(`script[src="${mfeSource}"]`);
  }

  private ensureMicroFrontend(command: string): void {
    if (command !== ShellCommand.AllCommands && !command.startsWith(SHELL_COMMAND_PREFIX)) {
      const microFrontendName = this.getMicroFrontendNameFromCommand(command);
      if (!this.loadedMicroFrontends.includes(microFrontendName)) {
        this.loadedMicroFrontends.push(microFrontendName);
        this.loadMicroFrontend(microFrontendName);
      }
    }
  }

  private getMicroFrontendNameFromCommand(command: string): string {
    return command.split(':')[0];
  }
}
