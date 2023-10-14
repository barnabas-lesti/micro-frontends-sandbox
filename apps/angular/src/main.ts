import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { attachEventBus } from '@mfs/event-bus';
import { attachStartupConfig } from '@mfs/startup-config';

import { AppModule } from './app/app.module';

attachStartupConfig();
attachEventBus();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
