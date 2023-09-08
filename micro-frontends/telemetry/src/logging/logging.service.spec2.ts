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
  let mockEventBusListen: jest.Mock;

  beforeEach(() => {
    // Clear the mock implementation before each test
    mockEventBusListen = jest.fn();
    document.obgEventBus = undefined;
    (LoggingService as any).instance = undefined;

    // Mock the EventBus.listen method
    document.obgEventBus = {
      listen: mockEventBusListen,
    } as any;
    LoggingService.Instance;
  });

  it('should listen to Debug events on the EventBus', () => {
    expect(mockEventBusListen).toHaveBeenCalledWith(LoggingCommands.Debug, expect.any(Function));
  });

  it('should listen to Error events on the EventBus', () => {
    expect(mockEventBusListen).toHaveBeenCalledWith(LoggingCommands.Error, expect.any(Function));
  });

  // Add similar tests for Info and Warn events

  it('should log a message when an event is emitted', () => {
    const logSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

    // Simulate an event emission
    const payload = {
      message: 'Debug message',
      sourceId: 'Source',
      method: 'Method',
    };

    const eventCallback = mockEventBusListen.mock.calls.find((call) => call[0] === LoggingCommands.Info)[1] as Function;

    eventCallback(payload);

    expect(logSpy).toHaveBeenCalledWith('[Source::Method] Debug message');
    logSpy.mockRestore();
  });
});
