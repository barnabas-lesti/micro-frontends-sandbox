import { createShell } from '@mfs/shell';

import './startup-context.mock';

import { HomeService } from './home';

createShell();

void HomeService.getInstance();
