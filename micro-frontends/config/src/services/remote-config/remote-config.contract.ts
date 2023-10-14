import { type DispatchPayload } from '@mfs-packages/event-bus';

import { type RemoteConfig } from './remote-config.types';

/**
 * Enum representing the available commands for remote configuration.
 */
export const enum RemoteConfigCommand {
  /**
   * Command to retrieve the remote configuration.
   */
  Get = 'config:remoteConfig:get',
}

/**
 * Defines the contract for remote configuration.
 */
export interface RemoteConfigContract {
  [RemoteConfigCommand.Get]: GetRemoteConfigPayload;
}

interface GetRemoteConfigPayload extends DispatchPayload<RemoteConfig> {}
