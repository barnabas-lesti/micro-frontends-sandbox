import { loadMicroFrontend } from '@mfs/shell';
import { REQUEST_SERVICE_NAME } from '@mfs/svc-request';

import { RemoteConfigService } from './remote-config';

loadMicroFrontend(REQUEST_SERVICE_NAME);

void RemoteConfigService.getInstance();
