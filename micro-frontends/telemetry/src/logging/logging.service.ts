import { EventBus } from '@wrs/shell';

import { FormattedError } from './logging.classes';
import { LOGGING_COMMAND_TO_FUNCTION_MAP } from './logging.const';
import { LoggingCommands } from './logging.contracts';
import { LogPayload } from './logging.types';

export class LoggingService {
  private eventBus: EventBus;

  private static instance: LoggingService;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.eventBus = document['obgEventBus'];

    this.listenToLoggingCommand(LoggingCommands.Debug);
    this.listenToLoggingCommand(LoggingCommands.Error);
    this.listenToLoggingCommand(LoggingCommands.Info);
    this.listenToLoggingCommand(LoggingCommands.Warn);
  }

  private listenToLoggingCommand(command: LoggingCommands): void {
    this.eventBus.listen<LogPayload>(command, (payload) => this.log(command, payload));
  }

  private log(command: LoggingCommands, payload: LogPayload): void {
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
