import { type RemoteConfig } from './remote-config.types';

export const enum RemoteConfigCommand {
  Get = 'config:remoteConfig:get',
}

export type RemoteConfigContract = {
  [RemoteConfigCommand.Get]: GetRemoteConfigPayload;
};

interface GetRemoteConfigPayload {
  onSuccess?: (remoteConfig: RemoteConfig) => void;
}
