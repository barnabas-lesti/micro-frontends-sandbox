import { delay } from '@wrs-packages/utility';

export const MICRO_FRONTENDS = [
  delay(() => import('@wrs-micro-frontends/request')),
  delay(() => import('@wrs-micro-frontends/config')),
];
