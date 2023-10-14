import { attachEventBus } from '@mfs-packages/event-bus';
import { attachStartupConfig } from '@mfs-packages/startup-config';

import { HomeService } from './home';

attachStartupConfig();
attachEventBus();

void HomeService.getInstance();
