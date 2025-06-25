import createDebug from 'debug';

import { HttpClient } from '../http';
import { URLHelper } from '../utilities';

import { FILE_API_PREFIX } from './constants';
import { FileErrorMapper } from './errors';
import {
  FileQueryParams,
  FileListResponse,
  FileResponse,
  FileUpdateData,
  MediaUploadResponse,
} from './types';

const debug = createDebug('strapi:files');

/**
 * A service class designed for interacting with the file management API in a Strapi application.
 *
 * It provides methods to fetch and retrieve files uploaded through the Strapi Media Library.
 *
 * Note that the Strapi upload plugin API uses a different response format than the content API,
 * returning file data as a flat array rather than the typical data/meta structure.
 */
export class FilesManager {
  private readonly _httpClient: HttpClient;

  /**
   * Creates an instance of FilesManager.
   *
   * @param httpClient - An instance of HttpClient to handle HTTP communication.
   *
   * @example
   * ```typescript
   * const httpClient = new HttpClient('http://localhost:1337/api');
   * const filesManager = new FilesManager(httpClient);
   * ```
   */
  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;

    debug('initialized files manager');
  }

  /**
   * Creates an HTTP client with file-specific error interceptors.
   *
   * @param fileId - Optional file ID to include in error messages.
   * @returns A new HttpClient instance with file-specific error handling.
   */
  private createFileHttpClient(fileId?: number): HttpClient {
    const client = this._httpClient.create();
    const mapper = FileErrorMapper.createMapper(fileId);

    // Add response interceptor to transform generic HTTP errors into file-specific errors
    client.interceptors.response.use(
      // Success handler
      undefined,
      // Error handler
      (error) => {
        if (error instanceof Error) {
          throw mapper(error);
        }

        // For other errors types, re-throw the original value
        throw error;
      }
    );

    return client;
  }

  /**
   * Retrieves a list of files based on optional query parameters.
   *
   * @param queryParams - Optional parameters to filter or sort the results.
   * @returns A promise that resolves to an array of file objects.
   *
   * @throws {FileForbiddenError} if the user does not have permission to list files.
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const filesManager = new FilesManager(httpClient);
   *
   * const files = await filesManager.find({
   *   filters: { mime: { $contains: 'image' } },
   *   sort: 'name:asc',
   * });
   *
   * console.log(files); // Array of file objects
   * ```
   */
  async find(queryParams?: FileQueryParams): Promise<FileListResponse> {
    debug('finding files');

    try {
      let url = `${FILE_API_PREFIX}/files`;

      if (queryParams) {
        url = URLHelper.appendQueryParams(url, queryParams);
      }

      const client = this.createFileHttpClient();
      const response = await client.get(url);
      const json = await response.json();

      debug('found %o files', Number(json?.length));

      return json;
    } catch (error) {
      debug('error finding files: %o', error);
      throw error;
    }
  }

  /**
   * Retrieves a single file by its ID.
   *
   * @param fileId - The numeric identifier of the file to retrieve.
   * @returns A promise that resolves to a single file object.
   *
   * @throws {FileNotFoundError} if the file with the specified ID does not exist.
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const filesManager = new FilesManager(httpClient);
   *
   * const file = await filesManager.findOne(1);
   *
   * console.log(file); // File object with details
   * ```
   */
  async findOne(fileId: number): Promise<FileResponse> {
    debug('finding file with ID %o', fileId);

    const url = `${FILE_API_PREFIX}/files/${fileId}`;
    const client = this.createFileHttpClient(fileId);

    try {
      const response = await client.get(url);

      const json = await response.json();

      debug('found file with ID %o', fileId);

      return json;
    } catch (error) {
      debug('error finding file with ID %o: %o', fileId, error);
      throw error;
    }
  }

  /**
   * Updates metadata for an existing file.
   *
   * @param fileId - The numeric identifier of the file to update.
   * @param fileInfo - An object containing the fields to update.
   * @returns A promise that resolves to the updated file object.
   *
   * @throws {FileNotFoundError} if the file with the specified ID does not exist.
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const filesManager = new FilesManager(httpClient);
   *
   * const updatedFile = await filesManager.update(1, {
   *   name: 'New file name',
   *   alternativeText: 'Descriptive alt text for accessibility',
   *   caption: 'A caption for the file'
   * });
   *
   * console.log(updatedFile); // Updated file object
   * ```
   */
  async update(fileId: number, fileInfo: FileUpdateData): Promise<FileResponse> {
    debug('updating file with ID %o with data %o', fileId, fileInfo);

    try {
      const url = `${FILE_API_PREFIX}?id=${fileId}`;
      const client = this.createFileHttpClient(fileId);

      // Create FormData and add fileInfo as JSON string
      const formData = new FormData();
      formData.append('fileInfo', JSON.stringify(fileInfo));

      const response = await client.post(url, formData);
      const json = await response.json();

      debug('successfully updated file with ID %o', fileId);

      return json;
    } catch (error) {
      debug('error updating file with ID %o: %o', fileId, error);
      throw error;
    }
  }

  /**
   * Deletes a file by its ID.
   *
   * @param fileId - The numeric identifier of the file to delete.
   * @returns A promise that resolves to the deleted file object.
   *
   * @throws {FileNotFoundError} if the file with the specified ID does not exist.
   * @throws {FileForbiddenError} if the user does not have permission to delete the file.
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const filesManager = new FilesManager(httpClient);
   *
   * await filesManager.delete(1);
   * console.log('File deleted successfully');
   * ```
   */
  async delete(fileId: number): Promise<FileResponse> {
    debug('deleting file with ID %o', fileId);

    try {
      const url = `${FILE_API_PREFIX}/files/${fileId}`;
      const client = this.createFileHttpClient(fileId);

      const response = await client.delete(url);
      const json = await response.json();

      debug('successfully deleted file with ID %o', fileId);

      return json;
    } catch (error) {
      debug('error deleting file with ID %o: %o', fileId, error);
      throw error;
    }
  }

  /**
   * Uploads a new media file to the Strapi Media Library.
   *
   * @param file - The file to upload (Blob).
   * @param filename - Optional filename to use for the uploaded file.
   * @returns A promise that resolves to the uploaded file information.
   *
   * @throws {FileForbiddenError} if the user does not have permission to upload files.
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const filesManager = new FilesManager(httpClient);
   *
   * // Upload with a File object (browser)
   * const fileInput = document.querySelector('input[type="file"]');
   * const file = fileInput.files[0];
   * const result = await filesManager.upload(file);
   *
   * // Upload with a Blob and custom filename (Node.js)
   * import { blobFrom } from 'node-fetch';
   * const file = await blobFrom('./1.png', 'image/png');
   * const result = await filesManager.upload(file);
   *
   * console.log(result); // Upload response with file details
   * ```
   */
  async upload(file: Blob, filename?: string): Promise<MediaUploadResponse> {
    debug('uploading new file with filename %o', filename);

    try {
      const url = FILE_API_PREFIX;
      const client = this.createFileHttpClient();

      const formData = new FormData();

      // The FormData will automatically set the Content-Type header with proper boundary
      // Our HTTP interceptor will skip setting Content-Type for FormData
      formData.append('files', file);

      const response = await client.post(url, formData);
      const json = await response.json();

      debug('successfully uploaded file');

      return json;
    } catch (error) {
      debug('error uploading file: %o', error);
      throw error;
    }
  }
}
