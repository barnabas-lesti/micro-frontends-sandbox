import { GetConfigPayload } from './config.types';

export const enum ConfigCommand {
  Get = 'config:get',
}

export type ConfigContract = {
  [ConfigCommand.Get]: GetConfigPayload;
};
