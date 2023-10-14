import { type StartupConfig } from './src';

declare global {
  interface Window {
    mfsStartupConfig: StartupConfig;
  }
}
