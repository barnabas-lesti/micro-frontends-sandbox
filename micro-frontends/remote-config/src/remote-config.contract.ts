import { type DispatchPayload } from 'packages/event-bus/types';

import { type RemoteConfig } from './remote-config.types';

export namespace RemoteConfigContract {
  export interface Get {
    'remoteConfig:get': GetRemoteConfigPayload;
  }
}

interface GetRemoteConfigPayload extends DispatchPayload<RemoteConfig> {}
