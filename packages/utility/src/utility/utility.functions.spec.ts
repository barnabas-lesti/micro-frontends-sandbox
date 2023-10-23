import { sanitizeData, stripSlashes, unblockThread } from './utility.functions';

describe('utility.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('unblockThread', () => {
    it('should unblock the thread using setTimeout', () => {
      const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

      const functionMock = jest.fn();
      unblockThread(functionMock);

      expect(setTimeoutSpy).toHaveBeenCalledWith(functionMock, 1);
    });
  });

  describe('stripSlashes', () => {
    it('should remove leading and trailing slashes', () => {
      expect(stripSlashes('/test')).toBe('test');
      expect(stripSlashes('test/')).toBe('test');
      expect(stripSlashes('/test/')).toBe('test');
      expect(stripSlashes('test')).toBe('test');
      expect(stripSlashes('/test/test')).toBe('test/test');
    });
  });

  describe('sanitizeData', () => {
    it('should sanitize provided data', () => {
      const data = { test: 'test' };
      const dataWithFunction = { test: 'test', fun: () => {} };

      expect(sanitizeData(data)).toEqual(data);
      expect(sanitizeData(dataWithFunction)).toEqual({ test: 'test' });
    });

    it('should return undefined if provided data is a function', () => {
      expect(sanitizeData(() => {})).toBeUndefined();
    });
  });
});
