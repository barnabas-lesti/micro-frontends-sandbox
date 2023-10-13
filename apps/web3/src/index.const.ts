import { delay } from '@mfs/utility';

export const MICRO_FRONTENDS = [
  delay(() => import('@mfs/request-mfe')),
  delay(() => import('@mfs/config-mfe')),
  delay(() => import('@mfs/platform-mfe')),
];
