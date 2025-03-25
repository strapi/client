import { Strapi } from '../../../src/client';
import { mockFile, mockFiles } from '../../fixtures/files';

describe('Strapi Client - Files Integration', () => {
  let strapi: Strapi;
  let mockFetch: jest.Mock;

  // Fixture data is now imported from tests/fixtures/files.ts

  beforeEach(() => {
    // Setup mock fetch
    mockFetch = jest.fn();
    jest.spyOn(globalThis, 'fetch').mockImplementation(mockFetch);

    // Create a new Strapi client instance
    strapi = new Strapi({
      baseURL: 'http://example.com/api',
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('files property', () => {
    it('should provide access to the files API', () => {
      expect(strapi.files).toBeDefined();
    });

    it('should have find and findOne methods', () => {
      expect(typeof strapi.files.find).toBe('function');
      expect(typeof strapi.files.findOne).toBe('function');
    });
  });

  describe('files.find integration', () => {
    it('should fetch files through the Strapi client', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Act
      const result = await strapi.files.find();

      // Assert
      expect(result).toEqual(mockFiles);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('http://example.com/api/upload/files');
      expect(requestArg.method).toBe('GET');
    });

    it('should pass filters through the Strapi client', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([mockFile]),
      });

      // Act
      const result = await strapi.files.find({
        filters: { mime: { $contains: 'image' } },
      });

      // Assert
      expect(result).toEqual([mockFile]);
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('filters%5Bmime%5D%5B%24contains%5D=image');
      expect(requestArg.method).toBe('GET');
    });

    it('should handle authenticated requests', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Create an authenticated Strapi client
      const authenticatedStrapi = new Strapi({
        baseURL: 'http://example.com/api',
        auth: {
          strategy: 'api-token',
          options: { token: 'test_token' },
        },
      });

      // Act
      await authenticatedStrapi.files.find();

      // Assert
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('http://example.com/api/upload/files');
      expect(requestArg.method).toBe('GET');
      expect(requestArg.headers.get('Authorization')).toBe('Bearer test_token');
    });
  });

  describe('files.findOne integration', () => {
    it('should fetch a single file by ID through the Strapi client', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFile),
      });

      // Act
      const result = await strapi.files.findOne(1);

      // Assert
      expect(result).toEqual(mockFile);
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('http://example.com/api/upload/files/1');
      expect(requestArg.method).toBe('GET');
    });

    it('should handle authentication errors', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      // Act & Assert
      await expect(strapi.files.findOne(1)).rejects.toThrow();
    });
  });

  describe('error handling integration', () => {
    it('should handle server errors consistently', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      // Act & Assert
      await expect(strapi.files.find()).rejects.toThrow();
    });

    it('should handle network errors consistently', async () => {
      // Arrange
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Act & Assert
      await expect(strapi.files.find()).rejects.toThrow('Network error');
    });
  });
});
