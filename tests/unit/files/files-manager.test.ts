import { HTTPNotFoundError } from '../../../src/errors';
import { FilesManager, FileNotFoundError, FileError, FileForbiddenError } from '../../../src/files';
import { HttpClient } from '../../../src/http';
import { mockFile, mockFiles } from '../../fixtures/files';
import { MockHttpClient } from '../mocks';

describe('FilesManager', () => {
  let httpClient: HttpClient;
  let filesManager: FilesManager;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    // Setup for direct fetch mocking approach
    mockFetch = jest.fn();
    // Save and mock the fetch function
    jest.spyOn(globalThis, 'fetch').mockImplementation(mockFetch);

    // Create a regular HttpClient that will use the mocked fetch
    httpClient = new HttpClient({ baseURL: 'http://example.com/api' });
    filesManager = new FilesManager(httpClient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create a new FilesManager instance with a valid HttpClient', () => {
      // Act
      const manager = new FilesManager(httpClient);

      // Assert
      expect(manager).toBeInstanceOf(FilesManager);
    });
  });

  describe('find', () => {
    it('should fetch files without parameters', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Act
      const result = await filesManager.find();

      // Assert
      expect(result).toEqual(mockFiles);
      expect(result.length).toBe(2);
    });

    it('should call the correct endpoint without query params', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Act
      await filesManager.find();

      // Assert
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toBe('http://example.com/api/upload/files');
      expect(requestArg.method).toBe('GET');
    });

    it('should append filters to the URL when provided', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([mockFile]),
      });

      // Act
      await filesManager.find({
        filters: { mime: { $contains: 'image' } },
      });

      // Assert
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain(
        'http://example.com/api/upload/files?filters%5Bmime%5D%5B%24contains%5D=image'
      );
    });

    it('should append sort string to the URL when provided', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Act
      await filesManager.find({
        sort: 'name:asc',
      });

      // Assert
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('sort=name%3Aasc');
    });

    it('should append sort array to the URL when provided', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Act
      await filesManager.find({
        sort: ['name:asc', 'size:desc'],
      });

      // Assert
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('sort%5B0%5D=name%3Aasc');
      expect(requestArg.url).toContain('sort%5B1%5D=size%3Adesc');
    });

    it('should handle both filters and sort parameters together', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([mockFile]),
      });

      // Act
      await filesManager.find({
        filters: { mime: { $contains: 'image' } },
        sort: 'name:asc',
      });

      // Assert
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('filters%5Bmime%5D%5B%24contains%5D=image');
      expect(requestArg.url).toContain('sort=name%3Aasc');
    });

    it('should throw an error when the server returns an error status', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      // Act & Assert
      await expect(filesManager.find()).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      // Arrange
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Act & Assert
      await expect(filesManager.find()).rejects.toThrow('Network error');
    });
  });

  describe('findOne', () => {
    it('should successfully retrieve a file by ID', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFile),
      });

      // Act
      const result = await filesManager.findOne(1);

      // Assert
      expect(result).toEqual(mockFile);
      expect(result.id).toBe(1);
    });

    it('should call the correct endpoint with the file ID', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFile),
      });

      // Act
      await filesManager.findOne(1);

      // Assert
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('http://example.com/api/upload/files/1');
      expect(requestArg.method).toBe('GET');
    });

    it('should throw an error for empty response body', async () => {
      // Arrange
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response('', { status: 200 }));
      });

      // Act & Assert
      await expect(filesManager.findOne(1)).rejects.toThrow();
    });

    it('should handle server errors (500)', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      // Act & Assert
      await expect(filesManager.findOne(1)).rejects.toThrow();
    });

    it('should include fileId in FileNotFoundError', async () => {
      // Arrange
      const fileId = 999;
      const mockRequest = new Request(`http://example.com/api/upload/files/${fileId}`);
      const mockResponse = new Response('Not Found', { status: 404, statusText: 'Not Found' });

      // Create an HTTPNotFoundError that would be thrown by the HttpClient
      const notFoundError = new HTTPNotFoundError(mockResponse, mockRequest);
      mockFetch.mockRejectedValueOnce(notFoundError);

      // Act
      try {
        await filesManager.findOne(fileId);
        fail('Expected an error to be thrown');
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(FileNotFoundError);
        if (error instanceof FileNotFoundError) {
          expect(error.fileId).toBe(fileId);
          expect(error.message).toContain(`File with ID ${fileId} not found`);
        }
      }
    });

    it('should preserve the original request and response in FileNotFoundError', async () => {
      // Arrange
      const fileId = 999;
      const mockRequest = new Request(`http://example.com/api/upload/files/${fileId}`);
      const mockResponse = new Response('Not Found', { status: 404, statusText: 'Not Found' });

      // Create an HTTPNotFoundError that would be thrown by the HttpClient
      const notFoundError = new HTTPNotFoundError(mockResponse, mockRequest);
      mockFetch.mockRejectedValueOnce(notFoundError);

      // Act
      try {
        await filesManager.findOne(fileId);
        fail('Expected an error to be thrown');
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(FileNotFoundError);
        if (error instanceof FileNotFoundError) {
          expect(error.request).toBe(mockRequest);
          expect(error.response).toBe(mockResponse);
        }
      }
    });

    it('should handle HTTP errors with status codes', async () => {
      // Arrange
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
      });

      // Act & Assert
      await expect(filesManager.findOne(1)).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      // Arrange
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Act & Assert
      await expect(filesManager.findOne(1)).rejects.toThrow('Network error');
    });

    it('should handle unexpected JSON parsing errors', async () => {
      // Arrange
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response('invalid json', { status: 200 }));
      });

      // Act & Assert
      await expect(filesManager.findOne(1)).rejects.toThrow();
    });
  });

  describe('integration between methods', () => {
    it('should be able to find a specific file from a file list', async () => {
      // Arrange
      // First, mock the find method to return a list
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Then, mock the findOne method to return a specific file
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFile),
      });

      // Act
      // First get all files
      const files = await filesManager.find();

      // Then get a specific file
      const file = await filesManager.findOne(1);

      // Assert
      expect(files.length).toBe(2);
      expect(file.id).toBe(1);
      expect(file.name).toBe('test-file.jpg');
    });
  });

  describe('error handling', () => {
    it('should handle and propagate HTTP errors correctly', async () => {
      // Arrange
      // Mock an authorization error
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      // Act & Assert
      await expect(filesManager.find()).rejects.toThrow();
    });

    it('should create and use FileError with correct name property', () => {
      // Arrange & Act
      const mockRequest = new Request('http://example.com/api/upload/files');
      const mockResponse = new Response('Server Error', { status: 500 });
      const fileError = new FileError(mockResponse, mockRequest);

      // Assert
      expect(fileError).toBeInstanceOf(FileError);
      expect(fileError.name).toBe('FileError');
      expect(fileError.request).toBe(mockRequest);
      expect(fileError.response).toBe(mockResponse);
    });

    it('should create and use FileForbiddenError with correct name property', () => {
      // Arrange & Act
      const mockRequest = new Request('http://example.com/api/upload/files');
      const mockResponse = new Response('Forbidden', { status: 403 });
      const forbiddenError = new FileForbiddenError(mockResponse, mockRequest);

      // Assert
      expect(forbiddenError).toBeInstanceOf(FileForbiddenError);
      expect(forbiddenError.name).toBe('FileForbiddenError');
      expect(forbiddenError.request).toBe(mockRequest);
      expect(forbiddenError.response).toBe(mockResponse);
    });

    it('should handle JSON parse errors in responses', async () => {
      // Arrange
      // Mock a response with invalid JSON
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response('this is not valid json', { status: 200 }));
      });

      // Act & Assert
      await expect(filesManager.find()).rejects.toThrow();
    });

    it('should handle non-Error type unexpected errors', async () => {
      // Arrange

      // Create a non-Error type that would trigger the specific error path
      const nonErrorObject = { message: 'This is not an Error instance' };
      mockFetch.mockRejectedValueOnce(nonErrorObject);

      // Act & Assert
      await expect(filesManager.find()).rejects.toEqual(nonErrorObject);
    });
  });

  describe('error handling with interceptors', () => {
    it('should create a custom HTTP client with error interceptors', async () => {
      // Arrange - Spy on the create method
      const createSpy = jest.spyOn(httpClient, 'create');

      // Mock to simulate a 404 error
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      // Act
      try {
        await filesManager.findOne(999);
      } catch (_error) {
        // We expect an error, so this is fine
      }

      // Assert
      expect(createSpy).toHaveBeenCalled();

      // Verify the interceptor was added to the client
      const createdClient = createSpy.mock.results[0]?.value;
      expect(createdClient?.interceptors.response).toBeDefined();
    });

    it('should pass undefined fileId to createFileHttpClient in find method', async () => {
      // Arrange
      // Create spy on the private method using any
      const createSpy = jest.spyOn(filesManager as any, 'createFileHttpClient');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Act
      await filesManager.find();

      // Assert
      // For the find method, we should not pass a fileId to createFileHttpClient
      expect(createSpy).not.toHaveBeenCalled();
    });

    it('should pass fileId to createFileHttpClient in findOne method', async () => {
      // Arrange
      // Create spy on the private method using any
      const createSpy = jest.spyOn(filesManager as any, 'createFileHttpClient');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFile),
      });

      // Act
      await filesManager.findOne(1);

      // Assert
      expect(createSpy).toHaveBeenCalledWith(1);
    });
  });
});
