import { StrapiValidationError, URLValidationError } from '../../../src/errors';
import { StrapiConfigValidator, URLValidator } from '../../../src/validators';

import type { StrapiClientConfig } from '../../../src/client';

describe('Strapi Config Validator', () => {
  let urlValidatorMock: jest.Mocked<URLValidator>;

  beforeEach(() => {
    urlValidatorMock = new URLValidator() as jest.Mocked<URLValidator>;
    urlValidatorMock.validate = jest.fn();
  });

  describe('validateConfig', () => {
    it.each([undefined, null, 2, []])(
      'should throw an error if config is not a valid object (%s)',
      (config: unknown) => {
        // Arrange
        const validator = new StrapiConfigValidator(urlValidatorMock);
        const expected = new StrapiValidationError(
          new TypeError('The provided configuration is not a valid object.')
        );

        // Act & Assert
        expect(() => validator.validateConfig(config as StrapiClientConfig)).toThrow(expected);
      }
    );

    it('should not throw an error if config is a valid object', () => {
      // Arrange
      const config = { baseURL: 'https://example.com' };
      const validator = new StrapiConfigValidator(urlValidatorMock);

      // Act & Assert
      expect(() => validator.validateConfig(config)).not.toThrow();
    });
  });

  describe('validateBaseURL', () => {
    it('should call validateBaseURL method with the baseURL', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const config: StrapiClientConfig = { baseURL: 'http://valid.url' };

      // Act
      validator.validateConfig(config);

      // Assert
      expect(urlValidatorMock.validate).toHaveBeenCalledWith('http://valid.url');
    });

    it('should throw StrapiValidationError on URLValidationError', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const baseURL = 'invalid-url';

      urlValidatorMock.validate.mockImplementationOnce(() => {
        throw new URLValidationError('invalid url');
      });

      // Act & Assert
      expect(() => validator.validateConfig({ baseURL })).toThrow(StrapiValidationError);
    });
  });

  describe('validateHeaders', () => {
    it('should accept custom headers in the config', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const config: StrapiClientConfig = {
        baseURL: 'https://example.com',
        headers: {
          Authorization: 'Bearer token123',
          'Custom-Header': 'Custom Value',
        },
      };

      // Act & Assert
      expect(() => validator.validateConfig(config)).not.toThrow();
    });

    it('should throw StrapiValidationError if headers is not an object', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const baseURL = 'https://example.com';
      const expected = new StrapiValidationError(new TypeError('Headers must be a valid object.'));

      // Act & Assert
      expect(() =>
        validator.validateConfig({
          baseURL,
          // @ts-expect-error: Testing invalid headers
          headers: 'invalid headers',
        })
      ).toThrow(expected);
    });

    it('should validate header values are strings not number', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const baseURL = 'https://example.com';
      const headers = {
        'Another-Header': 123,
      };

      const expected = new StrapiValidationError(new TypeError('Header values must be strings.'));

      // Act & Assert
      expect(() =>
        validator.validateConfig({
          baseURL,
          // @ts-expect-error - Testing invalid header values
          headers,
        })
      ).toThrow(expected);
    });

    it('should validate header values are strings not null', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const baseURL = 'https://example.com';
      const headers = {
        'Another-Header': null,
      };

      const expected = new StrapiValidationError(new TypeError('Header values must be strings.'));

      // Act & Assert
      expect(() =>
        validator.validateConfig({
          baseURL,
          // @ts-expect-error - Testing invalid header values
          headers,
        })
      ).toThrow(expected);
    });

    it('should validate header values are strings not boolean', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const baseURL = 'https://example.com';
      const headers = {
        'Custom-Header': true,
      };

      const expected = new StrapiValidationError(new TypeError('Header values must be strings.'));

      // Act & Assert
      expect(() =>
        validator.validateConfig({
          baseURL,
          // @ts-expect-error - Testing invalid header values
          headers,
        })
      ).toThrow(expected);
    });

    it('should validate header values are strings not undefined', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const baseURL = 'https://example.com';
      const headers = {
        'Custom-Header': undefined,
      };

      const expected = new StrapiValidationError(new TypeError('Header values must be strings.'));

      // Act & Assert
      expect(() =>
        validator.validateConfig({
          baseURL,
          // @ts-expect-error - Testing invalid header values
          headers,
        })
      ).toThrow(expected);
    });

    it('should handle empty headers object', () => {
      // Arrange
      const validator = new StrapiConfigValidator(urlValidatorMock);
      const config: StrapiClientConfig = {
        baseURL: 'https://example.com',
        headers: {},
      };

      // Act & Assert
      expect(() => validator.validateConfig(config)).not.toThrow();
    });
  });
});
