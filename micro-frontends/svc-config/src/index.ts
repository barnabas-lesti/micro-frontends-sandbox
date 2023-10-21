import { type GetRemoteConfigPayload } from './remote-config';

export const enum ConfigServiceCommand {
  GetRemoteConfig = 'svc-config:remote-config:get',
}

export interface ConfigServiceContract {
  [ConfigServiceCommand.GetRemoteConfig]: GetRemoteConfigPayload;
}
