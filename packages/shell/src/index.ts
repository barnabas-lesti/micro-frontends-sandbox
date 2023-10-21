import { attachEventBusToWindow } from './event-bus';
import { StartupContextService } from './startup-context';

export function createShell(): void {
  attachEventBusToWindow();

  void StartupContextService.getInstance();
}
