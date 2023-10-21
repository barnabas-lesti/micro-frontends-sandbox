import { type CustomErrorPayload } from './common.types';

export class CustomError<Data = undefined> extends Error {
  readonly code: string | undefined;
  readonly data: Data | undefined;

  constructor({ message, code, data }: CustomErrorPayload<Data>) {
    super(message);
    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
