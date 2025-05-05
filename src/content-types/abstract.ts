import { HttpClient } from '../http';

/**
 * Options to configure a content-type manager.
 */
export interface ContentTypeManagerOptions {
  /**
   * The name of the resource this manager handles.
   */
  resource: string;

  /**
   * Optional path override for the resource.
   *
   * If not provided, the resource name is used to construct the path.
   */
  path?: string;
}

/**
 * Abstract base class for managing content types.
 */
export abstract class AbstractContentTypeManager {
  /**
   * Configuration options for the content-type manager.
   */
  protected readonly _options: ContentTypeManagerOptions;

  /**
   * HTTP client instance for communicating with the Strapi app.
   */
  protected readonly _httpClient: HttpClient;

  protected constructor(options: ContentTypeManagerOptions, httpClient: HttpClient) {
    this._options = options;
    this._httpClient = httpClient;
  }

  /**
   * Gets the resource name for this manager.
   */
  protected get _resource() {
    return this._options.resource;
  }

  /**
   * Gets the configured path for this manager.
   *
   * Returns `undefined` if no path is explicitly set in the options.
   */
  protected get _path() {
    return this._options.path;
  }

  /**
   * Gets the root path for the resource.
   *
   * If a custom path is configured, it returns that value.
   *
   * Otherwise, it defaults to `/<resource>`.
   */
  protected get _rootPath() {
    return this._path ?? `/${this._resource}`;
  }
}
