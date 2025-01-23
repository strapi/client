import { Strapi } from './sdk';
import { StrapiConfigValidator } from './validators';

import type { StrapiConfig } from './sdk';

export * from './errors';

/**
 * Creates a new instance of the Strapi SDK with a specified configuration.
 *
 * The Strapi SDK functions as a client library to interface with the Strapi content API.
 *
 * It facilitates reliable and secure interactions with Strapi's APIs by handling URL validation,
 * request dispatch, and response parsing for content management.
 *
 * @param config - The configuration for initializing the SDK. This should include the base URL
 *                 of the Strapi content API that the SDK communicates with. The baseURL
 *                 must be formatted with one of the supported protocols: `http` or `https`.
 *                 Additionally, optional authentication details can be specified within the config.
 *
 * @returns An instance of the Strapi SDK configured with the specified baseURL and auth settings.
 *
 * @example
 * ```typescript
 * // Basic configuration using API token auth
 * const config = {
 *   baseURL: 'https://api.example.com',
 *   auth: {
 *     strategy: 'api-token',
 *     options: { token: 'your_token_here' }
 *   }
 * };
 *
 * // Create the SDK instance
 * const sdk = strapi(config);
 *
 * // Using the SDK to fetch content from a custom endpoint
 * const response = await sdk.fetch('/content-endpoint');
 * const data = await response.json();
 *
 * console.log(data);
 * ```
 *
 * @throws {StrapiInitializationError} If the provided baseURL doesn't conform to a valid HTTP or HTTPS URL,
 *                                        or if the auth configuration is invalid.
 */
export const strapi = (config: StrapiConfig) => {
  const configValidator = new StrapiConfigValidator();

  return new Strapi<typeof config>(
    // Properties
    config,
    // Dependencies
    configValidator
  );
};
