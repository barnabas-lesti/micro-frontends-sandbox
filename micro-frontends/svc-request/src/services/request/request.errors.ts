import { CustomError } from '@mfs/utility';

import { RequestErrorCode } from './request.types';

export function apiBaseURLRequiredError(): CustomError {
  return new CustomError({
    code: RequestErrorCode.API_BASE_URL_REQUIRED,
    message: '"window.mfsStartupContext.apiBaseURL" is required to make API requests',
  });
}
