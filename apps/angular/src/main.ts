import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { createShell } from '@mfs/shell';

import './startup-context.mock';

import { AppModule } from './app/app.module';

createShell();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
