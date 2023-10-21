import { type MakeAPIRequestPayload } from './services/request';

/**
 * Enum representing the available request commands.
 */
export const enum RequestCommand {
  /**
   * Command to make an API request.
   */
  MakeAPIRequest = 'svc-request:make-api-request',
}

/**
 * Defines the contract for the request service.
 */
export interface RequestContract {
  [RequestCommand.MakeAPIRequest]: MakeAPIRequestPayload;
}
