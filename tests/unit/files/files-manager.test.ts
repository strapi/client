import { FilesManager } from '../../../src/files';
import { FileResponse } from '../../../src/files/types';
import { HttpClient } from '../../../src/http';
import { MockHttpClient } from '../mocks';

describe('FilesManager', () => {
  let httpClient: HttpClient;
  let filesManager: FilesManager;
  let mockFetch: jest.Mock;

  // Mock file data for testing
  const mockFile: FileResponse = {
    id: 1,
    documentId: 'doc123',
    name: 'test-file.jpg',
    alternativeText: 'Test image',
    caption: 'A test image caption',
    width: 800,
    height: 600,
    hash: 'hash_12345',
    ext: '.jpg',
    mime: 'image/jpeg',
    url: 'https://example.com/uploads/test-file.jpg',
    size: 12345,
    provider: 'local',
    previewUrl: null,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  // Mock file list for testing
  const mockFiles = [
    mockFile,
    {
      ...mockFile,
      id: 2,
      name: 'another-file.pdf',
      ext: '.pdf',
      mime: 'application/pdf',
      url: 'https://example.com/uploads/another-file.pdf',
      width: 0,
      height: 0,
    },
  ];

  beforeEach(() => {
    // Setup for MockHttpClient approach
    httpClient = new MockHttpClient({ baseURL: 'https://example.com/api' });
    filesManager = new FilesManager(httpClient);

    // Setup for direct fetch mocking approach (alternative)
    mockFetch = jest.fn();
    // Save and mock the fetch function
    jest.spyOn(globalThis, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create a new FilesManager instance with a valid HttpClient', () => {
      const manager = new FilesManager(httpClient);
      expect(manager).toBeInstanceOf(FilesManager);
    });
  });

  describe('find', () => {
    it('should fetch files without parameters', async () => {
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify(mockFiles), { status: 200 }));
      });

      const result = await filesManager.find();

      expect(result).toEqual(mockFiles);
      expect(result.length).toBe(2);
    });

    it('should call the correct endpoint without query params', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      // Create a filesManager with real HttpClient for this test
      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await directFilesManager.find();

      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Update the expectation to check for the URL property in the Request object
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toBe('http://example.com/api/upload/files');
      expect(requestArg.method).toBe('GET');
    });

    it('should append filters to the URL when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([mockFile]),
      });

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await directFilesManager.find({
        filters: { mime: { $contains: 'image' } },
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain(
        'http://example.com/api/upload/files?filters%5Bmime%5D%5B%24contains%5D=image'
      );
    });

    it('should append sort string to the URL when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await directFilesManager.find({
        sort: 'name:asc',
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('sort=name%3Aasc');
    });

    it('should append sort array to the URL when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFiles),
      });

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await directFilesManager.find({
        sort: ['name:asc', 'size:desc'],
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('sort%5B0%5D=name%3Aasc');
      expect(requestArg.url).toContain('sort%5B1%5D=size%3Adesc');
    });

    it('should handle both filters and sort parameters together', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([mockFile]),
      });

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await directFilesManager.find({
        filters: { mime: { $contains: 'image' } },
        sort: 'name:asc',
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('filters%5Bmime%5D%5B%24contains%5D=image');
      expect(requestArg.url).toContain('sort=name%3Aasc');
    });

    it('should handle empty array response', async () => {
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify([]), { status: 200 }));
      });

      const result = await filesManager.find();

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should handle non-array response gracefully', async () => {
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify(null), { status: 200 }));
      });

      const result = await filesManager.find();

      expect(result).toBe(null);
    });

    it('should throw an error when the server returns an error status', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await expect(directFilesManager.find()).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await expect(directFilesManager.find()).rejects.toThrow('Network error');
    });
  });

  describe('findOne', () => {
    it('should successfully retrieve a file by ID', async () => {
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify(mockFile), { status: 200 }));
      });

      const result = await filesManager.findOne(1);

      expect(result).toEqual(mockFile);
      expect(result.id).toBe(1);
    });

    it('should call the correct endpoint with the file ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockFile),
      });

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await directFilesManager.findOne(1);

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const requestArg = mockFetch.mock.calls[0][0];
      expect(requestArg.url).toContain('http://example.com/api/upload/files/1');
      expect(requestArg.method).toBe('GET');
    });

    it('should throw an error for zero file ID', async () => {
      await expect(filesManager.findOne(0)).rejects.toThrow(
        'Invalid file ID: 0. File ID must be a positive number.'
      );
    });

    it('should throw an error for negative file ID', async () => {
      await expect(filesManager.findOne(-5)).rejects.toThrow(
        'Invalid file ID: -5. File ID must be a positive number.'
      );
    });

    it('should throw an error for NaN file ID', async () => {
      await expect(filesManager.findOne(NaN)).rejects.toThrow(
        'Invalid file ID: NaN. File ID must be a positive number.'
      );
    });

    it('should throw an error for empty response body', async () => {
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response('', { status: 200 }));
      });

      await expect(filesManager.findOne(1)).rejects.toThrow();
    });

    it('should throw an error for null response', async () => {
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify(null), { status: 200 }));
      });

      await expect(filesManager.findOne(1)).rejects.toThrow(
        'File with ID 1 not found or returned invalid data'
      );
    });

    it('should throw an error for non-object response', async () => {
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify('string response'), { status: 200 }));
      });

      await expect(filesManager.findOne(1)).rejects.toThrow(
        'File with ID 1 not found or returned invalid data'
      );
    });

    it('should handle server errors (500)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await expect(directFilesManager.findOne(1)).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await expect(directFilesManager.findOne(1)).rejects.toThrow('Network error');
    });

    it('should handle unexpected JSON parsing errors', async () => {
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response('invalid json', { status: 200 }));
      });

      await expect(filesManager.findOne(1)).rejects.toThrow();
    });
  });

  describe('integration between methods', () => {
    it('should be able to find a specific file from a file list', async () => {
      // First, mock the find method to return a list
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify(mockFiles), { status: 200 }));
      });

      // Then, mock the findOne method to return a specific file
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response(JSON.stringify(mockFile), { status: 200 }));
      });

      // First get all files
      const files = await filesManager.find();
      expect(files.length).toBe(2);

      // Then get a specific file
      const file = await filesManager.findOne(1);
      expect(file.id).toBe(1);
      expect(file.name).toBe('test-file.jpg');
    });
  });

  describe('error handling', () => {
    it('should handle and propagate HTTP errors correctly', async () => {
      // Mock an authorization error
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      const directHttpClient = new HttpClient({ baseURL: 'http://example.com/api' });
      const directFilesManager = new FilesManager(directHttpClient);

      await expect(directFilesManager.find()).rejects.toThrow();
    });

    it('should handle JSON parse errors in responses', async () => {
      // Mock a response with invalid JSON
      jest.spyOn(MockHttpClient.prototype, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve(new Response('this is not valid json', { status: 200 }));
      });

      await expect(filesManager.find()).rejects.toThrow();
    });
  });
});
