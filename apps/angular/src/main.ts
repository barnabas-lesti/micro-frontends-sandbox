import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createShell } from '@mfs/shell';

import { AppModule } from './app/app.module';

(async () => {
  try {
    await createShell();
    await platformBrowserDynamic().bootstrapModule(AppModule);
  } catch (error) {
    console.error(error);
  }
})();
