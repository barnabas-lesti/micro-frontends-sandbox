export interface StartupContext {
  apiBaseURL?: string;
}

export type GetStartupContextPayload = (startupContext: StartupContext) => void;
