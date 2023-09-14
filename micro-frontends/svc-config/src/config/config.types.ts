export type GetConfigPayload = {
  callback: (config: GlobalConfig) => void;
};

export interface GlobalConfig {
  baseURL: string;
}
