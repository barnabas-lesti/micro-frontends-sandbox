import { type DispatchPayload } from '@mfs-packages/event-bus';

import { type RemoteConfig } from './remote-config.types';

export const enum RemoteConfigCommand {
  /**
   * Command to retrieve the remote configuration.
   */
  Get = 'remoteConfig:get',
}

export interface RemoteConfigContract {
  [RemoteConfigCommand.Get]: GetRemoteConfigPayload;
}

interface GetRemoteConfigPayload extends DispatchPayload<RemoteConfig> {}
