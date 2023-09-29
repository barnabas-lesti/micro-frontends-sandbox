import { type MicroFrontendService } from '@wrs/shell/public';

import { LoggingService } from './src/logging/logging.service';

export default function (): MicroFrontendService[] {
  return [LoggingService.Instance];
}
