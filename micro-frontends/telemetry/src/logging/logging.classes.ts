export class FormattedError extends Error {
  constructor(message?: string, stack?: string) {
    super(message);
    this.stack = stack;
    Object.setPrototypeOf(this, FormattedError.prototype);
  }
}
