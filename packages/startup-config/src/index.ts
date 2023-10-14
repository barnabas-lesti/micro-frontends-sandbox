import { STARTUP_CONFIG_MOCK } from './startup-config.mock';

export type StartupConfig = ReturnType<typeof createStartupConfigObject>;

export function attachStartupConfig(): void {
  if (!window.mfsStartupConfig) {
    window.mfsStartupConfig = createStartupConfigObject();
  }
}

function createStartupConfigObject() {
  return STARTUP_CONFIG_MOCK;
}
