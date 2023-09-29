import { type MicroFrontendService } from '@wrs/shell/public';

import { ConfigService } from './src/config/config.service';

export default function (): MicroFrontendService[] {
  return [ConfigService.Instance];
}
