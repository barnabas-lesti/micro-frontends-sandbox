import { type MakeAPIRequestPayload } from './request';

/**
 * Enum representing the available request commands.
 */
export const enum RequestServiceCommand {
  /**
   * Command to make an API request.
   */
  MakeAPIRequest = 'svc-request:make-api-request',
}

/**
 * Defines the contract for the request service.
 */
export interface RequestServiceContract {
  [RequestServiceCommand.MakeAPIRequest]: MakeAPIRequestPayload;
}
