import { createShell } from '@mfs-packages/shell';

import { HomeService } from './home';

createShell();

void HomeService.getInstance();
