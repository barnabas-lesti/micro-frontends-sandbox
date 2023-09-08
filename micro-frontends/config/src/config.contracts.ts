import { GlobalConfig } from './config.types';

export const enum ConfigCommands {
  Get = 'config:get',
}

export type GetConfigPayload = (config: GlobalConfig) => void;
