import { RemoteConfigService } from './src/remote-config/remote-config.service';
import { StartupConfigService } from './src/startup-config/startup-config.service';

void StartupConfigService.create();
void RemoteConfigService.create();
