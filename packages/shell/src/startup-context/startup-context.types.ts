import { type DispatchPayload } from '../event-bus';

export interface StartupContext {
  apiBaseURL?: string;
}

export interface GetStartupContextPayload extends DispatchPayload<StartupContext> {}
