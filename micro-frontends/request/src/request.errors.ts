export const apiBaseURLRequiredError = () =>
  new Error('"window.mfsStartupConfig.apiBaseURL" is required to make API requests');
