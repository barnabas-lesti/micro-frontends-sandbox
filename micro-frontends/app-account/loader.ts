import { AuthService } from './src/services/auth/auth.service';

export default function () {
  void AuthService.Instance;
}
