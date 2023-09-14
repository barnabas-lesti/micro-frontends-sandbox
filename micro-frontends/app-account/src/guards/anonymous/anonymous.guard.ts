import { AuthService } from '../../services/auth/auth.service';

export function anonymousGuard() {
  void AuthService.Instance;
}
