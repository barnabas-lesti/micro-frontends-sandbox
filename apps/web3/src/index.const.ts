import { delay } from '@mfs-packages/utility';
import { type StartupConfig } from 'packages/startup-config/types';

export const MICRO_FRONTENDS = [
  delay(() => import('@mfs-micro-frontends/request')),
  delay(() => import('@mfs-micro-frontends/remote-config')),
  delay(() => import('@mfs-micro-frontends/platform')),
];

export const STARTUP_CONFIG: StartupConfig = {
  apiBaseURL: 'https://run.mocky.io',
};
