import { ApiTokenAuthProvider } from './auth';
import { StrapiClient } from './client';

import type { StrapiClientConfig } from './client';

export interface Config {
  /**
   * The base URL of the Strapi content API.
   *
   * This specifies where the client should send requests.
   *
   * The URL must include the protocol (`http` or `https`) and serve
   * as the root path for all later API operations.
   *
   * @example
   * 'https://api.example.com'
   *
   * @remarks
   * Failing to provide a valid HTTP or HTTPS URL results in a
   * `StrapiInitializationError`.
   */
  baseURL: string;

  /**
   * API token to authenticate requests (optional).
   *
   * When provided, this token is included in the `Authorization` header
   * of every request to the Strapi API.
   *
   * @remarks
   * - A valid token must be a non-empty string.
   *
   * - If the token is invalid or improperly formatted, the client
   * throws a `StrapiValidationError` during initialization.
   *
   * - If excluded, the client operates without authentication.
   */

  auth?: string;
}

/**
 * Creates a new instance of the Strapi Client with a specified configuration.
 *
 * The Strapi Client functions as a client library to interface with the Strapi content API.
 *
 * It facilitates reliable and secure interactions with Strapi's APIs by handling URL validation,
 * request dispatch, and response parsing for content management.
 *
 * @param config - The configuration for initializing the client. This should include the base URL
 *                 of the Strapi content API that the client communicates with. The baseURL
 *                 must be formatted with one of the supported protocols: `http` or `https`.
 *                 Additionally, optional authentication details can be specified within the config.
 *
 * @returns An instance of the Strapi Client configured with the specified baseURL and auth settings.
 *
 * @example
 * ```typescript
 * // Basic configuration using API token auth
 * const config = {
 *   baseURL: 'https://api.example.com',
 *   auth: 'your_token_here',
 * };
 *
 * // Create the client instance
 * const client = strapi(config);
 *
 * // Using the client to fetch content from a custom endpoint
 * const response = await client.fetch('/content-endpoint');
 * const data = await response.json();
 *
 * console.log(data);
 * ```
 *
 * @throws {StrapiInitializationError} If the provided baseURL doesn't conform to a valid HTTP or HTTPS URL,
 *                                        or if the auth configuration is invalid.
 */
export const strapi = (config: Config) => {
  const { baseURL, auth } = config;

  const clientConfig: StrapiClientConfig = { baseURL };

  // In this factory, while there is only one auth strategy available, users can't manually set the strategy options.
  // Since the client constructor needs to define a proper strategy,
  // it is handled here if the auth property is provided
  if (auth !== undefined) {
    clientConfig.auth = {
      strategy: ApiTokenAuthProvider.identifier,
      options: { token: auth },
    };
  }

  return new StrapiClient(clientConfig);
};
