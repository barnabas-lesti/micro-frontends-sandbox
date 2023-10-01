import { LoggingService } from './src/logging/logging.service';

export default function (): void {
  void LoggingService.getInstance();
}
