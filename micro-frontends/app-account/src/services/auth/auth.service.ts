import { SessionCookieService } from '../session-cookie/session-cookie.service';
import { AuthCommand, AuthContract } from './auth.contract';

export class AuthService {
  private static instance: AuthService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    void SessionCookieService.Instance;
    document.wrsEventBus.handle<AuthContract>(AuthCommand.TBD, () => {});
  }
}
