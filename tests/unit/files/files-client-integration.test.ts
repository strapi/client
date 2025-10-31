import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { StrapiClient } from '../../../src/client';
import { HTTPNotFoundError } from '../../../src/errors';
import { FileNotFoundError } from '../../../src/files';
import { mockFile, mockFiles } from '../../fixtures/files';

import type { Mock } from 'vitest';

describe('Strapi Client - Files Integration', () => {
  let strapi: StrapiClient;
  let mockFetch: Mock;

  beforeEach(() => {
    // Setup mock fetch
    mockFetch = vi.fn();
    vi.spyOn(globalThis, 'fetch').mockImplementation(mockFetch);

    // Create a new Strapi client instance
    strapi = new StrapiClient({
      baseURL: 'http://example.com/api',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
        json: vi.fn().mockResolvedValueOnce(mockFiles),
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
        json: vi.fn().mockResolvedValueOnce([mockFile]),
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
        json: vi.fn().mockResolvedValueOnce(mockFiles),
      });

      // Create an authenticated Strapi client
      const authenticatedStrapi = new StrapiClient({
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
        json: vi.fn().mockResolvedValueOnce(mockFile),
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

  describe('files.update integration', () => {
    it('should pass authentication headers when updating a file', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockFile),
      });

      // Create an authenticated Strapi client
      const authenticatedStrapi = new StrapiClient({
        baseURL: 'http://example.com/api',
        auth: {
          strategy: 'api-token',
          options: { token: 'test_token' },
        },
      });

      // Act
      await authenticatedStrapi.files.update(1, { name: 'Updated via token auth' });

      // Assert
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toBe('http://example.com/api/upload?id=1');
      expect(requestArg.method).toBe('POST');
      expect(requestArg.headers.get('Authorization')).toBe('Bearer test_token');

      // Verify request has a body
      expect(requestArg.body).toBeTruthy();
    });

    it('should handle validation errors when updating a file', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      // Act & Assert
      await expect(strapi.files.update(1, { name: 'Test' })).rejects.toThrow();
    });

    it('should handle file not found errors', async () => {
      // Arrange
      const fileId = 999;
      const mockRequest = new Request(`http://example.com/api/upload?id=${fileId}`);
      const mockResponse = new Response('Not Found', { status: 404, statusText: 'Not Found' });

      // Create a not found error that will be thrown by HttpClient
      const httpNotFoundError = new HTTPNotFoundError(mockResponse, mockRequest);
      mockFetch.mockRejectedValueOnce(httpNotFoundError);

      // Act & Assert
      try {
        await strapi.files.update(fileId, { name: 'Test' });
        fail('Expected error was not thrown');
      } catch (error) {
        // The error should be mapped to a FileNotFoundError
        expect(error).toBeInstanceOf(FileNotFoundError);
        if (error instanceof FileNotFoundError) {
          expect(error.fileId).toBe(fileId);
          expect(error.message).toContain(`File with ID ${fileId} not found`);
        }
      }
    });
  });

  describe('files.delete integration', () => {
    it('should correctly call the delete endpoint', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValueOnce({ id: 1, name: 'deleted-file.jpg' }),
      });

      // Act
      const result = await strapi.files.delete(1);

      // Assert
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toBe('http://example.com/api/upload/files/1');
      expect(requestArg.method).toBe('DELETE');
      expect(result).toEqual({ id: 1, name: 'deleted-file.jpg' });
    });

    it('should pass authentication headers when deleting a file', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValueOnce({ id: 1, name: 'deleted-file.jpg' }),
      });

      // Create an authenticated Strapi client
      const authenticatedStrapi = new StrapiClient({
        baseURL: 'http://example.com/api',
        auth: {
          strategy: 'api-token',
          options: { token: 'test_token' },
        },
      });

      // Act
      await authenticatedStrapi.files.delete(1);

      // Assert
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toBe('http://example.com/api/upload/files/1');
      expect(requestArg.method).toBe('DELETE');
      expect(requestArg.headers.get('Authorization')).toBe('Bearer test_token');
    });

    it('should handle file not found errors when deleting', async () => {
      // Arrange
      const fileId = 999;
      const mockRequest = new Request(`http://example.com/api/upload/files/${fileId}`);
      const mockResponse = new Response('Not Found', { status: 404, statusText: 'Not Found' });

      // Create a not found error that will be thrown by HttpClient
      const httpNotFoundError = new HTTPNotFoundError(mockResponse, mockRequest);
      mockFetch.mockRejectedValueOnce(httpNotFoundError);

      // Act & Assert
      try {
        await strapi.files.delete(fileId);
        fail('Expected error was not thrown');
      } catch (error) {
        // The error should be mapped to a FileNotFoundError
        expect(error).toBeInstanceOf(FileNotFoundError);
        if (error instanceof FileNotFoundError) {
          expect(error.fileId).toBe(fileId);
          expect(error.message).toContain(`File with ID ${fileId} not found`);
        }
      }
    });
  });
});
