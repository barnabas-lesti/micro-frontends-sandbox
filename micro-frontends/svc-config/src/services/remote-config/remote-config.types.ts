import { type DispatchPayload } from '@mfs/shell/contract';

/**
 * Represents the configuration settings retrieved from a remote source.
 */
export interface RemoteConfig {
  features?: {
    isHomePageBannerEnabled?: boolean;
  };
}

export interface GetRemoteConfigPayload extends DispatchPayload<RemoteConfig> {}
