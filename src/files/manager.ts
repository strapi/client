import createDebug from 'debug';

import { HttpClient } from '../http';
import { URLHelper } from '../utilities';

import { FILE_API_PREFIX } from './constants';
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
      // Handle validation errors which are already Error instances
      if (error instanceof Error) {
        debug('error finding files: %o', error.message);
        throw error;
      }

      // Pass through HTTP errors from the HttpClient
      debug('unexpected error finding files: %o', error);
      throw error;
    }
  }

  /**
   * Retrieves a single file by its ID.
   *
   * @param fileId - The numeric identifier of the file to retrieve.
   * @returns A promise that resolves to a single file object.
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   * @throws {Error} if the file ID is invalid or the file does not exist.
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

    try {
      const response = await this._httpClient.get(url);
      const json = await response.json();

      debug('found file with ID %o', fileId);

      return json;
    } catch (error) {
      debug('error finding file with ID %o: %o', fileId, error);

      // Handle 404 errors with a more specific message
      if ((error as Response)?.status === 404) {
        throw new Error(
          `File with ID ${fileId} not found. The requested file may have been deleted or never existed.`
        );
      }

      // For other HTTP errors, provide context about the operation
      if ((error as Response)?.status) {
        throw new Error(
          `Failed to retrieve file with ID ${fileId}. Server returned status: ${(error as Response).status}.`
        );
      }

      // Rethrow the original error if it's not an HTTP response or already an Error
      throw error;
    }
  }
}
