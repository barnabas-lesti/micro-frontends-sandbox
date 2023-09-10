export const enum ConfigCommand {
  Get = 'config:get',
}

export type ConfigContract = {
  [ConfigCommand.Get]: GetConfigPayload;
};

export type GetConfigPayload = {
  callback: (config: GlobalConfig) => void;
};

export interface GlobalConfig {
  baseURL: string;
}
