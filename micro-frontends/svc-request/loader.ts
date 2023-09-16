import { type MicroFrontendService } from 'shell/public';

import { RequestService } from './src/request/request.service';

export default function (): MicroFrontendService[] {
  return [RequestService.Instance];
}
