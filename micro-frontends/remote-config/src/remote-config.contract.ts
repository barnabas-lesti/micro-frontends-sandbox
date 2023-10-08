import { type DispatchPayload } from '@mfs-packages/event-bus';

import { type RemoteConfig } from './remote-config.types';

export interface RemoteConfigContract {
  'remoteConfig:get': GetRemoteConfigPayload;
}

interface GetRemoteConfigPayload extends DispatchPayload<RemoteConfig> {}
