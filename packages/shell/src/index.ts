import { attachEventBusToWindow } from './event-bus';
import { MicroFrontendLoaderService } from './micro-frontend-loader';
import { StartupContextService } from './startup-context';

export function createShell(): void {
  attachEventBusToWindow();

  void StartupContextService.getInstance();
  void MicroFrontendLoaderService.getInstance();
}
