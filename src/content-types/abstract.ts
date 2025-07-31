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

  /**
   * Optional plugin configuration parameters.
   *
   * If not provided, the resource is assumed to be a regular content-type.
   */
  plugin?: {
    /**
     * When specified, indicates that this content-type belongs to a specific plugin.
     */
    name: string;
    /**
     * Optional prefix for plugin routes.
     *
     * When a plugin is specified, routes are prefixed with the plugin name by default.
     * Setting this to an empty string ('') will disable prefixing for plugins
     * that don't use it. e.g. the 'users-permissions' plugin.
     */
    prefix?: string;
  };
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
   * Gets the configured plugin name for this manager.
   *
   * Returns `undefined` if no plugin is explicitly set in the options.
   */
  protected get _pluginName() {
    return this._options.plugin?.name;
  }

  /**
   * Gets the configured prefix for this manager.
   *
   * Returns the explicit prefix if set, otherwise defaults to the plugin name if a plugin is specified.
   */
  protected get _pluginPrefix() {
    // If prefix is explicitly set (including ''), use it
    if (this._options.plugin?.prefix !== undefined) {
      return this._options.plugin.prefix;
    }

    // If plugin is specified but no explicit prefix, default to plugin name
    if (this._pluginName) {
      return this._pluginName;
    }

    // No plugin, no prefix
    return undefined;
  }

  /**
   * Gets the root path for the resource.
   *
   * If a custom path is configured, it returns that value.
   *
   * If a plugin is specified, the path is constructed with the plugin prefix.
   * - With plugin prefix: `/<prefix>/<resource>`
   * - Without plugin: `/<resource>`
   */
  protected get _rootPath() {
    if (this._path) {
      return this._path;
    }

    const prefix = this._pluginPrefix;
    if (prefix) {
      return `/${prefix}/${this._resource}`;
    }

    return `/${this._resource}`;
  }
}
