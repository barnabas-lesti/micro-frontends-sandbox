import { type MakeAPIRequestPayload } from './services/request';

/**
 * Enum representing the available request commands.
 */
export const enum RequestMFECommand {
  /**
   * Command to make an API request.
   */
  MakeAPIRequest = 'request:makeAPIRequest',
}

/**
 * Defines the contract for the request service.
 */
export interface RequestMFEContract {
  [RequestMFECommand.MakeAPIRequest]: MakeAPIRequestPayload;
}
