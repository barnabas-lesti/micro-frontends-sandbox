import { CustomError } from '@mfs/utility';

import { MicroFrontendLoaderErrorCode } from './micro-frontend-loader.types';

export function microFrontendsURLRequiredError(): CustomError {
  return new CustomError({
    code: MicroFrontendLoaderErrorCode.MICRO_FRONTENDS_REMOTE_URL_REQUIRED,
    message: '"window.mfsStartupContext.microFrontendsURL" is required to load micro frontends',
  });
}
