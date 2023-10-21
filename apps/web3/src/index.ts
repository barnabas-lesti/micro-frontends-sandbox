import { createShell } from '@mfs/shell';

import { HomeService } from './home';

createShell();

void HomeService.getInstance();
