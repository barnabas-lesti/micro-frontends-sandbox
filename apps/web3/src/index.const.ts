import { type StartupConfig } from '@mfs/shell';
import { delay } from '@mfs/utility';

export const MICRO_FRONTENDS = [
  delay(() => import('@mfs/request-mfe')),
  delay(() => import('@mfs/config-mfe')),
  delay(() => import('@mfs/platform-mfe')),
];

export const STARTUP_CONFIG: StartupConfig = {
  apiBaseURL: 'https://run.mocky.io',
};
