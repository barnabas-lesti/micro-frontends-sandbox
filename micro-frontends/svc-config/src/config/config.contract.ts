import { GlobalConfig } from './config.types';

export const enum ConfigCommand {
  Get = 'config:get',
}

export type ConfigContract = {
  [ConfigCommand.Get]: [undefined, GlobalConfig];
};
