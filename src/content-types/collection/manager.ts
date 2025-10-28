import createDebug from 'debug';

import { HttpClient } from '../../http';
import { URLHelper } from '../../utilities';
import { AbstractContentTypeManager } from '../abstract';
import { pluginsThatDoNotWrapDataAttribute } from '../constants';

import type * as API from '../../types/content-api';
import type { ContentTypeManagerOptions } from '../abstract';

const debug = createDebug('strapi:ct:collection');

/**
 * A service class designed for interacting with a collection-type resource in a Strapi app.
 *
 * It provides methods to fetch, update, or delete documents of a specified Strapi collection-type.
 *
 * #### Overview
 * - The class is instantiated with the plural resource name and an HTTP client.
 * - All operations use the resource's plural name to construct the API endpoint.
 * - It also supports optional query parameters for filtering, sorting, pagination, etc.
 */
export class CollectionTypeManager extends AbstractContentTypeManager {
  /**
   * Creates an instance of {@link CollectionTypeManager}`.
   *
   * @param options - Configuration options, including the plural name of the resource as defined in the Strapi app.
   * @param httpClient - An instance of {@link HttpClient} to handle HTTP communication.
   *
   * @example
   * ```typescript
   * const httpClient = new HttpClient('http://localhost:1337/api');
   * const articlesManager = new CollectionTypeManager('articles', httpClient);
   * ```
   */
  constructor(options: ContentTypeManagerOptions, httpClient: HttpClient) {
    super(options, httpClient);

    debug('initialized a new "collection" manager with %o', options);
  }

  /**
   * Determines if the current resource should have its payload wrapped in a "data" object.
   *
   * NOTE: the users-permissions plugin has a different API contract than regular content-types.
   * It expects raw payload data without wrapping in a "data" object.
   * As this is a Strapi managed plugin, we support this edge case here.
   *
   * @private
   * @returns true if the resource should use data wrapping (regular content-types)
   */
  private shouldWrapDataBodyAttribute(): boolean {
    return !pluginsThatDoNotWrapDataAttribute.includes(this._pluginName ?? '');
  }

  /**
   * Retrieves multiple documents.
   *
   * @param [queryParams] - Optional query parameters to filter, sort, or paginate the results.
   *
   * @returns A list of documents matching the given request.
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const articlesManager = new CollectionTypeManager('articles', httpClient);
   *
   * const articles = await articlesManager.find({
   *   filters: { published: true },
   *   sort: 'title'
   * });
   *
   * console.log(articles);
   * ```
   */
  async find(queryParams?: API.BaseQueryParams): Promise<API.DocumentResponseCollection> {
    debug('finding documents for %o', this._resource);

    let url = this._rootPath;

    if (queryParams) {
      url = URLHelper.appendQueryParams(url, queryParams);
    }

    const response = await this._httpClient.get(url);
    const json = await response.json();

    debug('found %o %o documents', Number(json?.data?.length), this._resource);

    return json;
  }

  /**
   * Retrieves a single document by its ID.
   *
   * @param documentID - The unique identifier of the document to retrieve.
   * @param [queryParams] - Optional query parameters to include additional data or filtering.
   *
   * @returns A single document
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const articlesManager = new CollectionTypeManager('articles', httpClient);
   *
   * // Find an article by its document ID
   * const article = await articlesManager.findOne('ebd74ca4-288f-41a2-974c-a4288fa1a24f');
   *
   * // Find a version of a document using its document ID and filters
   * const localizedArticle = await articlesManager.findOne('ebd74ca4-288f-41a2-974c-a4288fa1a24f', { locale: 'es' });
   * ```
   *
   */
  async findOne(
    documentID: string,
    queryParams?: API.BaseQueryParams
  ): Promise<API.DocumentResponse> {
    debug('finding a document for %o with id: %o', this._resource, documentID);

    let url = `${this._rootPath}/${documentID}`;

    if (queryParams) {
      url = URLHelper.appendQueryParams(url, queryParams);
    }

    const response = await this._httpClient.get(url);

    debug('found the %o document with document id %o', this._resource, documentID);

    return response.json();
  }

  /**
   * Creates a new document.
   *
   * @param data - The content data of the document to create.
   * @param [queryParams] - Optional query parameters for adding additional metadata.
   *
   * @returns The created document
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const articlesManager = new CollectionTypeManager('articles', httpClient);
   *
   * // Create a new article document
   * const newArticle = await articlesManager.create({ title: 'My New Article', content: '...' });
   * ```
   */
  async create(
    data: Record<string, any>,
    queryParams?: API.BaseQueryParams
  ): Promise<API.DocumentResponse> {
    debug('creating a document for %o', this._resource);

    let url = this._rootPath;

    if (queryParams) {
      url = URLHelper.appendQueryParams(url, queryParams);
    }

    const response = await this._httpClient.post(
      url,
      // Conditionally wrap the payload in a data object
      JSON.stringify(this.shouldWrapDataBodyAttribute() ? { data } : data),
      // By default POST requests sets the content-type to text/plain
      { headers: { 'Content-Type': 'application/json' } }
    );

    debug('created the %o document', this._resource);

    return response.json();
  }

  /**
   * Updates an existing document
   *
   * @param documentID - The unique identifier of the document to update.
   * @param data - The content data to update for the document.
   * @param [queryParams] - Optional query parameters for additional metadata.
   *
   * @returns The updated document
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * ```typescript
   * const articlesManager = new CollectionTypeManager('articles', httpClient);
   *
   * // Update an article content
   * const updatedArticle = await articlesManager.update('3ec3770c-9d02-4798-8377-0c9d02079818', { title: 'Updated Article Title' });
   *
   * // Update localized article content
   * const localizedUpdatedArticle = await articlesManager.update(
   *   '22127a83-4ed4-4249-927a-834ed4a249a6',
   *   { title: 'Inicio Actualizado' },
   *   { locale: 'es' }
   * );
   * ```
   */
  async update(
    documentID: string,
    data: Record<string, unknown>,
    queryParams?: API.BaseQueryParams
  ): Promise<API.DocumentResponse> {
    debug('updating a document for %o with id: %o', this._resource, documentID);

    let url = `${this._rootPath}/${documentID}`;

    if (queryParams) {
      url = URLHelper.appendQueryParams(url, queryParams);
    }

    const response = await this._httpClient.put(
      url,
      // Conditionally wrap the payload in a data object
      JSON.stringify(this.shouldWrapDataBodyAttribute() ? { data } : data),
      // By default PUT requests sets the content-type to text/plain
      { headers: { 'Content-Type': 'application/json' } }
    );

    debug('updated the %o document with id %o', this._resource, documentID);

    return response.json();
  }

  /**
   * Deletes a document
   *
   * @param documentID - The unique identifier of the document to delete.
   * @param [queryParams] - Optional query parameters for additional metadata.
   *
   * @throws {HTTPError} if the HTTP client encounters connection issues, the server is unreachable, or authentication fails.
   *
   * @example
   * @example
   * ```typescript
   * const articlesManager = new CollectionTypeManager('articles', httpClient);
   *
   * // Delete an article
   * await articlesManager.delete('3ec3770c-9d02-4798-8377-0c9d02079818');
   *
   * // Delete the Spanish version of a document
   * await articlesManager.delete(
   *   '59b2774f-90a5-498e-b277-4f90a5198e96',
   *   { locale: 'es' }
   * );
   * ```
   */
  async delete(documentID: string, queryParams?: API.BaseQueryParams): Promise<void> {
    debug('deleting a document for %o with id: %o', this._resource, documentID);

    let url = `${this._rootPath}/${documentID}`;

    if (queryParams) {
      url = URLHelper.appendQueryParams(url, queryParams);
    }

    await this._httpClient.delete(url);

    debug('deleted the %o document with id %o', this._resource, documentID);
  }
}
