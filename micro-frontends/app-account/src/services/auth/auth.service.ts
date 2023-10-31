export class AuthService {
  private static _instance: AuthService | undefined;

  static getInstance(): AuthService {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    // mfsEventBus.dispatch(TelemetryServiceCommand.Log, { source: ['app-account', 'AuthService', 'constructor'] });
  }
}
