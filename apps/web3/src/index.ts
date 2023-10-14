import { attachEventBus } from '@mfs/event-bus';
import { attachStartupConfig } from '@mfs/startup-config';
import { attachUtilities } from '@mfs/utility';

import { HomeService } from './home';

attachUtilities();
attachStartupConfig();
attachEventBus();

void HomeService.getInstance();
