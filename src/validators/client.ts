import createDebug from 'debug';

import { StrapiValidationError, URLValidationError } from '../errors';

import { URLValidator } from './url';

import type { StrapiClientConfig } from '../client';

const debug = createDebug('strapi:validators:config');

/**
 * Provides the ability to validate the configuration used for initializing the Strapi client.
 *
 * This includes URL validation to ensure compatibility with Strapi's API endpoints.
 */
export class StrapiConfigValidator {
  private readonly _urlValidator: URLValidator;

  constructor(
    // Dependencies
    urlValidator: URLValidator = new URLValidator()
  ) {
    this._urlValidator = urlValidator;
  }

  /**
   * Validates the provided client configuration, ensuring that all values are
   * suitable for the client operations..
   *
   * @param config - The configuration object for the Strapi client. Must include a `baseURL` property indicating the API's endpoint.
   *
   * @throws {StrapiValidationError} If the configuration is invalid, or if the baseURL is invalid.
   */
  validateConfig(config: StrapiClientConfig) {
    debug('validating client config');

    if (
      config === undefined ||
      config === null ||
      Array.isArray(config) ||
      typeof config !== 'object'
    ) {
      debug(`provided client configuration is not a valid object: %o (%s)`, config, typeof config);

      throw new StrapiValidationError(
        new TypeError('The provided configuration is not a valid object.')
      );
    }

    this.validateBaseURL(config.baseURL);
    this.validateHeaders(config.headers);

    debug('validated client config successfully');
  }

  /**
   * Validates the base URL, ensuring it follows acceptable protocols and structure for reliable API interaction.
   *
   * @param url - The base URL string to validate.
   *
   * @throws {StrapiValidationError} If the URL is invalid or if it fails through the URLValidator checks.
   */
  private validateBaseURL(url: unknown) {
    try {
      debug('validating base url');
      this._urlValidator.validate(url);
    } catch (e) {
      if (e instanceof URLValidationError) {
        debug('failed to validate client config, invalid base url %o', url);
        throw new StrapiValidationError(e);
      }

      throw e;
    }
  }

  /**
   * Validates the headers object to ensure it's a plain object with string key-value pairs.
   *
   * @param headers - The headers object to validate.
   *
   * @throws {StrapiValidationError} If the headers are invalid.
   */
  private validateHeaders(headers: unknown) {
    debug('validating headers');

    if (headers === undefined) {
      return;
    }

    if (headers === null || typeof headers !== 'object' || Array.isArray(headers)) {
      debug(`invalid headers type: %o (%s)`, headers, typeof headers);
      throw new StrapiValidationError(new TypeError('Headers must be a valid object.'));
    }

    for (const [key, value] of Object.entries(headers)) {
      if (typeof value !== 'string') {
        debug(`invalid header value for key %s: %o (%s)`, key, value, typeof value);
        throw new StrapiValidationError(new TypeError('Header values must be strings.'));
      }
    }

    debug('headers validated successfully');
  }
}
