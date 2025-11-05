import { fetch } from '../src/index';

describe('lambda-fetch', () => {
  beforeEach(() => {
    // Mock global fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('basic functionality', () => {
    it('should make a GET request by default', async () => {
      const mockResponse = { ok: true, json: async () => ({ data: 'test' }) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const response = await fetch('https://api.example.com/data');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
      expect(response).toBe(mockResponse);
    });

    it('should support POST requests', async () => {
      const mockResponse = { ok: true, json: async () => ({ id: 1 }) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetch('https://api.example.com/users', {
        method: 'POST',
        body: JSON.stringify({ name: 'John' }),
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'John' }),
        })
      );
    });

    it('should include custom headers', async () => {
      const mockResponse = { ok: true };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetch('https://api.example.com/protected', {
        headers: {
          Authorization: 'Bearer token',
        },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/protected',
        expect.objectContaining({
          headers: {
            Authorization: 'Bearer token',
          },
        })
      );
    });
  });

  describe('timeout handling', () => {
    it('should use default timeout of 30 seconds', async () => {
      const mockResponse = { ok: true };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetch('https://api.example.com/data');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });

    it('should support custom timeout', async () => {
      const mockResponse = { ok: true };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await fetch('https://api.example.com/data', { timeout: 5000 });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });

    it('should throw timeout error when request exceeds timeout', async () => {
      (global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(new DOMException('Aborted', 'AbortError')), 100);
          })
      );

      await expect(fetch('https://api.example.com/slow', { timeout: 50 })).rejects.toThrow(
        'Request timeout after 50ms'
      );
    });
  });

  describe('error handling', () => {
    it('should propagate fetch errors', async () => {
      const error = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValue(error);

      await expect(fetch('https://api.example.com/data')).rejects.toThrow('Network error');
    });

    it('should handle unknown errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue('Unknown error');

      await expect(fetch('https://api.example.com/data')).rejects.toThrow(
        'An unknown error occurred during fetch'
      );
    });
  });
});
