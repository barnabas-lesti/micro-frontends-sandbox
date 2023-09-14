import { FormattedError } from './logging.classes';
import { LOGGING_COMMAND_TO_FUNCTION_MAP } from './logging.const';
import { LoggingCommand, LoggingContract } from './logging.contract';
import { LogPayload } from './logging.types';

export class LoggingService {
  private static instance: LoggingService;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.listenToLoggingCommand(LoggingCommand.Debug);
    this.listenToLoggingCommand(LoggingCommand.Error);
    this.listenToLoggingCommand(LoggingCommand.Info);
    this.listenToLoggingCommand(LoggingCommand.Warn);
  }

  private listenToLoggingCommand(command: LoggingCommand): void {
    document.wrsEventBus.handle<LoggingContract>(command, (payload) => this.log(command, payload));
  }

  private log(command: LoggingCommand, payload: LogPayload): void {
    const logFunction = LOGGING_COMMAND_TO_FUNCTION_MAP[command];
    const formattedMessage = this.getFormattedMessage(payload);

    payload.data ? logFunction(formattedMessage, payload.data) : logFunction(formattedMessage);
  }

  private getFormattedMessage(payload: LogPayload): string | Error {
    return payload.message instanceof Error
      ? new FormattedError(this.buildLogMessage(payload), payload.message.stack)
      : this.buildLogMessage(payload);
  }

  private buildLogMessage({ message, sourceId, method }: LogPayload): string {
    return message ? `[${sourceId}::${method}] ${message}` : `[${sourceId}::${method}]`;
  }
}
