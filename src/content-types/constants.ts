/**
 * Mapping of well-known Strapi resource names to their plugin configurations.
 * This enables automatic handling of special Strapi content-types that have
 * different API contracts than regular content-types.
 */
export const WELL_KNOWN_STRAPI_RESOURCES: Record<
  string,
  { plugin: { name: string; prefix: string } }
> = {
  // Users from users-permissions plugin don't wrap data and have no route prefix
  users: {
    plugin: {
      name: 'users-permissions',
      prefix: '',
    },
  },
};

/**
 * List of plugin names that do not wrap the inner payload in a "data" attribute.
 */
export const pluginsThatDoNotWrapDataAttribute = ['users-permissions'];
