import { AuthService } from '../../services/auth/auth.service';

export function secureGuard() {
  void AuthService.Instance;
}
