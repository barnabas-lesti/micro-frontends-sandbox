import { type GetRemoteConfigPayload } from './services/remote-config';

export const enum ConfigMFECommand {
  GetRemoteConfig = 'config:remoteConfig:get',
}

export interface ConfigMFEContract {
  [ConfigMFECommand.GetRemoteConfig]: GetRemoteConfigPayload;
}
