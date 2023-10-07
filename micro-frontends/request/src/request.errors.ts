export const apiBaseURLRequiredError = () =>
  new Error('"window.wrsStartupConfig.apiBaseURL" is required to make API requests');
