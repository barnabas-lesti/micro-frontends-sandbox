import { type StartupConfig } from '@mfs-packages/shell';
import { delay } from '@mfs-packages/utility';

export const MICRO_FRONTENDS = [
  delay(() => import('@mfs-micro-frontends/request')),
  delay(() => import('@mfs-micro-frontends/config')),
  delay(() => import('@mfs-micro-frontends/platform')),
];

export const STARTUP_CONFIG: StartupConfig = {
  apiBaseURL: 'https://run.mocky.io',
};
