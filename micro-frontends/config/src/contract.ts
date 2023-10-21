import { type GetRemoteConfigPayload } from './services/remote-config';

export const enum ConfigCommand {
  GetRemoteConfig = 'config:remoteConfig:get',
}

export interface ConfigContract {
  [ConfigCommand.GetRemoteConfig]: GetRemoteConfigPayload;
}
