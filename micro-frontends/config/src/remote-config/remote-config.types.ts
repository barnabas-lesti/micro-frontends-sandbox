export const enum RemoteConfigCommand {
  Get = 'config:remoteConfig:get',
}

export type RemoteConfigContract = {
  [RemoteConfigCommand.Get]: [null, RemoteConfig];
};

export interface RemoteConfig {
  baseURL: string;
}
