import { CustomError } from '@mfs/utility';

import { RequestErrorCode } from './request.types';

export function apiURLRequiredError(): CustomError {
  return new CustomError({
    code: RequestErrorCode.API_URL_REQUIRED,
    message: '"window.mfsStartupContext.apiURL" is required to make API requests',
  });
}
