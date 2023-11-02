import { type AuthVerifyPayload } from './auth';

export const enum AccountAppCommand {
  Verify = 'app-account:auth:verify',
}

export interface AccountAppContract {
  [AccountAppCommand.Verify]: AuthVerifyPayload;
}
