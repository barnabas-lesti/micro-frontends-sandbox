import { attachEventBus } from '@mfs/event-bus';
import { attachStartupConfig } from '@mfs/startup-config';

import { HomeService } from './home';

attachStartupConfig();
attachEventBus();

void HomeService.getInstance();
