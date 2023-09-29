export interface LogPayload {
  sourceId: string;
  method: string;
  message?: string | Error;
  data?: unknown;
}
