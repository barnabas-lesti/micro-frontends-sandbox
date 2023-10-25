import { PlatformServiceCommand } from '..';
import { PlatformService } from './platform.service';

describe('PlatformService', () => {
  let platformService: PlatformService;

  beforeEach(() => {
    (window as any).mfsEventBus = {
      listen: jest.fn(),
      dispatch: jest.fn(),
    };
    platformService = PlatformService.getInstance();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    (PlatformService as any)._instance = undefined;
    (window as any).mfsEventBus = undefined;
  });

  describe('constructor', () => {
    it('should listen to the "IsBrowser" command on the EventBus', () => {
      expect(mfsEventBus.listen).toHaveBeenCalledWith(PlatformServiceCommand.IsBrowser, expect.any(Function));
    });

    it('should listen to the "GetBrowserType" command on the EventBus', () => {
      expect(mfsEventBus.listen).toHaveBeenCalledWith(PlatformServiceCommand.GetBrowserType, expect.any(Function));
    });
  });

  describe('isBrowser', () => {
    it('should return true when running in a browser environment', () => {
      expect(platformService.isBrowser()).toBe(true);
    });

    it('should return false when running in a non-browser environment', () => {
      jest.spyOn(globalThis, 'window', 'get').mockReturnValue(undefined as any);
      expect(platformService.isBrowser()).toBe(false);
    });
  });

  // describe('"GetBrowserType" command', () => {
  //   it('should listen to the command on the EventBus', () => {
  //     expect(mfsEventBus.listen).toHaveBeenCalledWith(PlatformServiceCommand.GetBrowserType, expect.any(Function));
  //   });
  // });
});
