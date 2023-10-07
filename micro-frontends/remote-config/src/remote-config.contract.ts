import { type RemoteConfig } from './remote-config.types';

// V1
export const enum RemoteConfigCommand {
  Get = 'config:remoteConfig:get',
}

export type RemoteConfigContract = {
  [RemoteConfigCommand.Get]: GetRemoteConfigPayload;
};

// V2
export interface RemoteConfigContractV2 {
  'config:remoteConfig:get': GetRemoteConfigPayload;
}

interface GetRemoteConfigPayload {
  onSuccess?: (remoteConfig: RemoteConfig) => void;
}
