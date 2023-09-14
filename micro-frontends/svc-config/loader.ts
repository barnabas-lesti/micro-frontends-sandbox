import { ConfigService } from './src/config/config.service';

export default function () {
  void ConfigService.Instance;
}
