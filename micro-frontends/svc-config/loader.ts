import { type MicroFrontendService } from 'shell/public';

import { ConfigService } from './src/config/config.service';

export default function (): MicroFrontendService[] {
  return [ConfigService.Instance];
}
