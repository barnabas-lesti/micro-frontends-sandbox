import { type StartupConfig } from './startup-config.types';

export const enum StartupConfigCommand {
  Get = 'config:startupConfig:get',
}

export type StartupConfigContract = {
  [StartupConfigCommand.Get]: GetStartupConfigPayload;
};

interface GetStartupConfigPayload {
  onSuccess?: (startupConfig: StartupConfig) => void;
}
