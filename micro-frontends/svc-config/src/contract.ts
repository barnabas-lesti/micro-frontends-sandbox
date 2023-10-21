import { type GetRemoteConfigPayload } from './services/remote-config';

export const enum ConfigCommand {
  GetRemoteConfig = 'svc-config:remote-config:get',
}

export interface ConfigContract {
  [ConfigCommand.GetRemoteConfig]: GetRemoteConfigPayload;
}
