import { type RemoteConfig } from './remote-config.types';

export namespace RemoteConfigContract {
  export interface Get {
    'remoteConfig:get': GetRemoteConfigPayload;
  }
}

interface GetRemoteConfigPayload {
  onSuccess?: (remoteConfig: RemoteConfig) => void;
}
