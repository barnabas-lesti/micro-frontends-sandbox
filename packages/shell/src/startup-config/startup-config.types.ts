import { type createStartupConfigObject } from './startup-config.functions';

export type StartupConfig = ReturnType<typeof createStartupConfigObject>;
