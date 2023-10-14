import { type DispatchPayload } from '@mfs/shell';

import { type RemoteConfig } from './remote-config.types';

/**
 * Enum representing the available commands for remote configuration.
 */
export const enum RemoteConfigCommand {
  /**
   * Command to retrieve the remote configuration.
   */
  Get = 'remoteConfig:get',
}

/**
 * Defines the contract for remote configuration.
 */
export interface RemoteConfigContract {
  [RemoteConfigCommand.Get]: GetRemoteConfigPayload;
}

interface GetRemoteConfigPayload extends DispatchPayload<RemoteConfig> {}
