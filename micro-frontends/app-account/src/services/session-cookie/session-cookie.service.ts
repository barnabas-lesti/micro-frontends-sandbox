export class SessionCookieService {
  private static instance: SessionCookieService;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {}
}
