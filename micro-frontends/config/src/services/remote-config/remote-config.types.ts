import { type DispatchPayload } from '@mfs-packages/shell/contract';

/**
 * Represents the configuration settings retrieved from a remote source.
 */
export interface RemoteConfig {
  features?: {
    isHomePageBannerEnabled?: boolean;
  };
}

export interface GetRemoteConfigPayload extends DispatchPayload<RemoteConfig> {}
