import { ConfigService } from './src/config/config.service';

export default function (): void {
  void ConfigService.Instance;
}
