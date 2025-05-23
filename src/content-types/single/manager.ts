import createDebug from 'debug';

import { HttpClient } from '../../http';
import { URLHelper } from '../../utilities';
import { AbstractContentTypeManager } from '../abstract';

import type * as API from '../../types/content-api';
import type { ContentTypeManagerOptions } from '../abstract';

const debug = createDebug('strapi:ct:single');

/**
 * A service class designed for interacting with a single-type resource in a Strapi app.
 *
 * It provides methods to fetch, update, or delete a document of a specified Strapi single-type.
 *
 * #### Overview
 * - The class is instantiated with the singular resource name and an HTTP client.
 * - All operations use the resource's singular name to construct the API endpoint.
 * - It also supports optional query parameters for filtering, sorting, pagination, etc.
 */
export class SingleTypeManager extends AbstractContentTypeManager {
  /**
   * Creates an instance of {@link SingleTypeManager}.
   *
   * @param options - Configuration options, including the singular name of the resource as defined in the Strapi app.
   * @param httpClient - An instance of {@link HttpClient} to handle HTTP communication.
   *
   * @example
   * ```typescript
   * const httpClient = new HttpClient('http://localhost:1337/api');
   * const homepageManager = new SingleTypeManager('homepage', httpClient);
   * ```
   */
  constructor(options: ContentTypeManagerOptions, httpClient: HttpClient) {
    super(options, httpClient);

    debug('initialized a new "single" manager with %o', options);
  }

  /**
   * Retrieves the document of the specified single-type resource.
   *
   * @param [queryParams] - Optional query parameters to customize the request, such as filters or locale.
   *                        Query parameters follow the Strapi conventions for filtering, pagination, and sorting.
   *
   * @returns The full document for the single-type resource.
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const homepageManager = new SingleTypeManager('homepage', httpClient);
   *
   * // Fetch the homepage content without additional filtering
   * const homepageContent = await homepageManager.find();
   *
   * // Fetch homepage contents for the 'es' locale
   * const localizedHomepage = await homepageManager.find({ locale: 'es' });
   * ```
   */
  async find(queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse> {
    debug('finding document for %o', this._resource);

    let path = this._rootPath;

    if (queryParams) {
      path = URLHelper.appendQueryParams(path, queryParams);
    }

    const response = await this._httpClient.get(path);

    debug('the %o document has been fetched', this._resource);

    return response.json();
  }

  /**
   * Updates the document of the specified single-type resource with the provided data.
   *
   * @param data -  A record of key-value pairs that represent the fields to update.
   *                Must follow the schema defined in the Strapi app.
   * @param [queryParams] - Optional query parameters to customize the request, such as locale or other additional filters.
   *
   * @returns The updated document for the single-type resource.
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const homepageManager = new SingleTypeManager('homepage', httpClient);
   *
   * // Update the homepage content
   * const updatedHomepage = await homepageManager.update({ title: 'Updated Homepage Title' });
   *
   * // Update localized homepage content
   * const localizedUpdatedHomepage = await homepageManager.update(
   *   { title: 'Inicio Actualizado' },
   *   { locale: 'es' }
   * );
   * ```
   */
  async update(
    data: Record<string, any>,
    queryParams?: API.BaseQueryParams
  ): Promise<API.DocumentResponse> {
    debug('updating document for %o', this._resource);

    let url = this._rootPath;

    if (queryParams) {
      url = URLHelper.appendQueryParams(url, queryParams);
    }

    const response = await this._httpClient.put(
      url,
      // Wrap the payload in a data object
      JSON.stringify({ data }),
      // By default PUT requests sets the content-type to text/plain
      { headers: { 'Content-Type': 'application/json' } }
    );

    debug('the %o document has been updated', this._resource);

    return response.json();
  }

  /**
   * Deletes the document of the specified single-type resource.
   *
   * @param [queryParams] - Optional query parameters to customize the request, such as locale or other additional filters.
   *
   * @returns The response after the deletion, confirming the successful removal of the document.
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable,
   *                 or authentication fails.
   *
   * @example
   * ```typescript
   * const homepageManager = new SingleTypeManager('homepage', httpClient);
   *
   * // Delete the homepage content
   * await homepageManager.delete();
   *
   * // Delete localized homepage content in Spanish
   * await homepageManager.delete({ locale: 'es' });
   * ```
   *
   * @see HttpClient
   * @see URLHelper.appendQueryParams
   */
  async delete(queryParams?: API.BaseQueryParams): Promise<void> {
    debug('deleting document for %o', this._resource);

    let url = this._rootPath;

    if (queryParams) {
      url = URLHelper.appendQueryParams(url, queryParams);
    }

    await this._httpClient.delete(url);

    debug('the %o document has been deleted', this._resource);
  }
}
