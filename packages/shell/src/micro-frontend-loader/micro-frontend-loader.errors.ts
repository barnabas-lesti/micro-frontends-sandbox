import { CustomError } from '@mfs/utility';

import { MicroFrontendLoaderErrorCode } from './micro-frontend-loader.types';

export function backendBaseURLRequiredError(): CustomError {
  return new CustomError({
    code: MicroFrontendLoaderErrorCode.MICRO_FRONTENDS_REMOTE_URL_REQUIRED,
    message: '"window.mfsStartupContext.backendBaseURL" is required to load micro frontends',
  });
}
