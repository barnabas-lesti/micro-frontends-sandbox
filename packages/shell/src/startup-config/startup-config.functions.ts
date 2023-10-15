import { STARTUP_CONFIG_MOCK } from './startup-config.mock';

export function attachStartupConfigToWindow(): void {
  if (!window.mfsStartupConfig) {
    window.mfsStartupConfig = createStartupConfigObject();
  }
}

export function createStartupConfigObject() {
  return STARTUP_CONFIG_MOCK;
}
