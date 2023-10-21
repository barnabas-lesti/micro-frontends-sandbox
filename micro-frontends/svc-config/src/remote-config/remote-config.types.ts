/**
 * Represents the configuration settings retrieved from a remote source.
 */
export interface RemoteConfig {
  features?: {
    isHomePageBannerEnabled?: boolean;
  };
}

export type GetRemoteConfigPayload = (remoteConfig: RemoteConfig) => void;
