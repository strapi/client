/**
 * Registry of well-known collection-type resources in Strapi.
 * These resources have different API contracts than regular content-types.
 */
const WELL_KNOWN_COLLECTIONS: Record<string, WellKnownResourceConfig> = {
  /**
   * Users from the users-permissions plugin.
   * - Routes: /users (no plugin prefix)
   * - Data wrapping: No (expects raw payloads)
   */
  users: {
    plugin: {
      name: 'users-permissions',
      prefix: '',
    },
    wrapsData: false,
  },
};

/**
 * Registry of well-known single-type resources in Strapi.
 * Currently empty as there are no known single-types with special API contracts.
 */
const WELL_KNOWN_SINGLES: Record<string, WellKnownResourceConfig> = {
  // Currently no well-known single-types with special API contracts
  // Example structure if needed in the future:
  // '[some-single-type]': {
  //   plugin: { name: '[plugin-name]', prefix: '[plugin-prefix]' },
  //   wrapsData: false,
  // },
};

/**
 * Configuration for well-known Strapi resources that have special API contracts.
 */
export interface WellKnownResourceConfig {
  /**
   * Plugin configuration for the resource.
   */
  plugin: {
    /**
     * Name of the plugin that owns this resource.
     */
    name: string;
    /**
     * Route prefix for the plugin.
     * Empty string means no prefix is used.
     */
    prefix: string;
  };
  /**
   * Whether this resource type wraps request payloads in a "data" object.
   * Regular Strapi content-types wrap data: { data: {...} }
   * Some plugins (like users-permissions) expect unwrapped data: {...}
   */
  wrapsData: boolean;
}

/**
 * Gets the configuration for a well-known collection resource, if it exists.
 *
 * @internal
 * @param resource - The collection resource name to look up
 * @returns The resource configuration if found, undefined otherwise
 */
export function getWellKnownCollection(resource: string): WellKnownResourceConfig | undefined {
  return WELL_KNOWN_COLLECTIONS[resource];
}

/**
 * Gets the configuration for a well-known single-type resource, if it exists.
 *
 * @internal
 * @param resource - The single-type resource name to look up
 * @returns The resource configuration if found, undefined otherwise
 */
export function getWellKnownSingle(resource: string): WellKnownResourceConfig | undefined {
  return WELL_KNOWN_SINGLES[resource];
}

/**
 * Checks if a resource should wrap data in a "data" object based on its plugin.
 *
 * @param pluginName - The name of the plugin, if any
 * @returns true if data should be wrapped, false otherwise
 */
export function shouldWrapData(pluginName: string | undefined): boolean {
  if (pluginName === undefined) {
    return true; // Regular content-types wrap data
  }

  // Check if this plugin is known to not wrap data
  const knownPlugin = Object.values({
    ...WELL_KNOWN_COLLECTIONS,
    ...WELL_KNOWN_SINGLES,
  }).find((config) => config.plugin.name === pluginName);

  return knownPlugin?.wrapsData ?? true;
}
