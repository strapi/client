import createDebug from 'debug';

import { HTTPNotFoundError } from '../errors';
import { HttpClient } from '../http';
import { URLHelper } from '../utilities';

import { FILE_API_PREFIX } from './constants';
import { FileNotFoundError } from './errors';
import { FileQueryParams, FileListResponse, FileResponse } from './types';

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

    // Add response interceptor to transform generic HTTP errors into file-specific errors
    client.interceptors.response.use(
      // Success handler
      ({ request, response }) => {
        return { request, response };
      },
      // Error handler
      (error) => {
        // Check if this is a Not Found error and we have a fileId
        if (error instanceof HTTPNotFoundError && fileId !== undefined) {
          throw new FileNotFoundError(fileId, error);
        }

        // For other errors, rethrow the original error
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
      let url = FILE_API_PREFIX;

      if (queryParams) {
        url = URLHelper.appendQueryParams(url, queryParams);
      }

      const response = await this._httpClient.get(url);
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

    const url = `${FILE_API_PREFIX}/${fileId}`;
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
}
