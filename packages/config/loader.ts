import { RemoteConfigService } from './src/remote-config/remote-config.service';

export default function (): void {
  void RemoteConfigService.getInstance();
}
