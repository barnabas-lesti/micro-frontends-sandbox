import { bootstrapApplication } from '@angular/platform-browser';

import { APP_ROUTER_PROVIDER, AppContainer } from './app';

bootstrapApplication(AppContainer, {
  providers: [APP_ROUTER_PROVIDER],
}).catch((err) => console.error(err));
