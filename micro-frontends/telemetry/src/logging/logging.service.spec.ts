/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */

import { LoggingCommands } from './logging.contracts';
import { LoggingService } from './logging.service';

// Mock the EventBus
jest.mock('@obg/shell/event-bus', () => ({
  EventBus: {
    listen: jest.fn(),
  },
}));

describe('LoggingService', () => {
  beforeAll(() => {
    document.obgEventBus = {
      listen: jest.fn(),
      dispatch: jest.fn(),
    } as any;
  });

  beforeEach(() => {
    (LoggingService as any).instance = undefined;
    LoggingService.Instance;
  });

  it('should listen to Debug events on the EventBus', () => {
    expect(document.obgEventBus.listen).toHaveBeenCalledWith(
      LoggingCommands.Debug,
      (LoggingService.prototype as any).log,
    );
  });

  it('should listen to Info events on the EventBus', () => {
    expect(document.obgEventBus.listen).toHaveBeenCalledWith(LoggingCommands.Info, expect.any(Function));
  });

  it('should listen to Warn events on the EventBus', () => {
    expect(document.obgEventBus.listen).toHaveBeenCalledWith(LoggingCommands.Warn, expect.any(Function));
  });

  it('should listen to Error events on the EventBus', () => {
    expect(document.obgEventBus.listen).toHaveBeenCalledWith(LoggingCommands.Error, expect.any(Function));
  });

  it('should log a message when an event is emitted', () => {
    // const debugListener = (document.obgEventBus.listen as jest.Mock).mock.calls[0] as Function;

    // Simulate an event emission
    const payload = {
      message: 'Debug message',
      sourceId: 'Source',
      method: 'Method',
    };

    const logSpy = jest.spyOn<any, string>(LoggingService.Instance, 'log');
    logSpy.mockImplementation();

    const infoLogHandler = (document.obgEventBus.listen as jest.Mock).mock.calls.find(
      (call) => call[0] === LoggingCommands.Info,
    )[1] as Function;

    infoLogHandler(payload);

    expect(logSpy).toHaveBeenCalledWith(LoggingCommands.Info, payload);
    // logSpy.mockRestore();

    // expect(true).toBeTruthy();
  });
});
