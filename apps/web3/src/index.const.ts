import { delay } from '@wrs-packages/utility';
import { type StartupConfig } from 'packages/startup-config/types';

export const MICRO_FRONTENDS = [
  delay(() => import('@wrs-micro-frontends/request')),
  delay(() => import('@wrs-micro-frontends/remote-config')),
];

export const STARTUP_CONFIG: StartupConfig = {
  apiBaseURL: 'https://run.mocky.io',
};
