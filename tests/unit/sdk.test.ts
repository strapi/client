import {
  HTTPAuthorizationError,
  HTTPBadRequestError,
  HTTPError,
  HTTPForbiddenError,
  HTTPInternalServerError,
  HTTPNotFoundError,
  HTTPTimeoutError,
  StrapiInitializationError,
} from '../../src';
import { CollectionTypeManager, SingleTypeManager } from '../../src/content-types';
import { HttpClient, StatusCode } from '../../src/http';
import { Strapi } from '../../src/sdk';
import { StrapiConfigValidator } from '../../src/validators';

import {
  MockAuthManager,
  MockAuthProvider,
  MockHttpClient,
  MockStrapiConfigValidator,
  MockFlakyURLValidator,
} from './mocks';

import type { HttpClientConfig } from '../../src/http';
import type { StrapiConfig } from '../../src/sdk';

describe('Strapi', () => {
  const mockHttpClientFactory = (config: HttpClientConfig) => new MockHttpClient(config);

  beforeEach(() => {
    jest
      .spyOn(MockHttpClient.prototype, 'fetch')
      .mockImplementation(() =>
        Promise.resolve(
          new Response(JSON.stringify({ data: { id: 1 }, meta: {} }), { status: 200 })
        )
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with valid config', () => {
      // Arrange
      const config = {
        baseURL: 'https://localhost:1337/api',
        auth: { strategy: MockAuthProvider.identifier, options: {} },
      } satisfies StrapiConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const validatorSpy = jest.spyOn(mockValidator, 'validateConfig');
      const authSetStrategySpy = jest.spyOn(MockAuthManager.prototype, 'setStrategy');

      // Act
      const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

      // Assert

      expect(sdk).toBeInstanceOf(Strapi);
      expect(validatorSpy).toHaveBeenCalledWith(config);
      expect(authSetStrategySpy).toHaveBeenCalledWith(MockAuthProvider.identifier, {});
    });

    it('should not set the auth strategy if no auth config is provided', () => {
      // Arrange
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const authSetStrategySpy = jest.spyOn(MockAuthManager.prototype, 'setStrategy');

      // Act
      const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

      // Assert
      expect(sdk).toBeInstanceOf(Strapi);
      expect(authSetStrategySpy).not.toHaveBeenCalled();
    });

    it('should throw an error on invalid baseURL', () => {
      // Arrange
      const config = { baseURL: 'invalid-url' } satisfies StrapiConfig;

      const mockValidator = new MockStrapiConfigValidator();

      const validateConfigSpy = jest.spyOn(mockValidator, 'validateConfig');

      // Act & Assert
      expect(() => new Strapi(config, mockValidator)).toThrow(StrapiInitializationError);
      expect(validateConfigSpy).toHaveBeenCalledWith(config);
    });

    it('should fail to create and SDK instance if there is an unexpected error', () => {
      // Arrange
      let sdk!: Strapi;

      const baseURL = 'https://example.com';
      const config: StrapiConfig = { baseURL } satisfies StrapiConfig;
      const expectedError = new StrapiInitializationError(new Error('Unexpected error'));

      const validateSpy = jest.spyOn(MockFlakyURLValidator.prototype, 'validate');

      // Act
      const instantiateSDK = () => {
        sdk = new Strapi(config, new StrapiConfigValidator(new MockFlakyURLValidator()));
      };

      // Assert
      expect(instantiateSDK).toThrow(expectedError);

      expect(sdk).toBeUndefined();

      expect(validateSpy).toHaveBeenCalledTimes(1);
      expect(validateSpy).toHaveBeenCalledWith(baseURL);
    });

    it('should initialize correctly with the default validator', () => {
      // Arrange
      const sdk = new Strapi({ baseURL: 'https://localhost:1337/api' });

      // Act & Assert
      expect(sdk).toBeInstanceOf(Strapi);
    });
  });

  describe('Collection', () => {
    it('should return a new CollectionTypeManager instance when given a resource name', () => {
      // Arrange
      const resource = 'articles';
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

      // Act
      const collection = sdk.collection(resource);

      // Assert
      expect(collection).toBeInstanceOf(CollectionTypeManager);
      expect(collection).toHaveProperty('_pluralName', resource);
    });
  });

  describe('Single', () => {
    it('should return a new SingleTypeManager instance when given a resource name', () => {
      // Arrange
      const resource = 'homepage';
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

      // Act
      const single = sdk.single(resource);

      // Assert
      expect(single).toBeInstanceOf(SingleTypeManager);
      expect(single).toHaveProperty('_singularName', resource);
    });
  });

  describe('Custom Interceptors', () => {
    describe('HTTP', () => {
      it('fetch should add an application/json Content-Type header to each request', async () => {
        // Arrange
        const path = '/homepage';
        const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiConfig;

        const mockValidator = new MockStrapiConfigValidator();
        const mockAuthManager = new MockAuthManager();

        const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

        const fetchSpy = jest.spyOn(MockHttpClient.prototype, 'fetch');

        // Act
        await sdk.fetch(path);
        const headers = fetchSpy.mock.lastCall?.[1]?.headers;

        // Assert
        expect(headers).toBeDefined();
        expect(headers).toBeInstanceOf(Headers);
        expect((headers as Headers).get('Content-Type')).toBe('application/json');
      });

      it.each([
        ['Bad Request', StatusCode.BAD_REQUEST, HTTPBadRequestError],
        ['Unauthorized', StatusCode.UNAUTHORIZED, HTTPAuthorizationError],
        ['Forbidden', StatusCode.FORBIDDEN, HTTPForbiddenError],
        ['Not Found', StatusCode.NOT_FOUND, HTTPNotFoundError],
        ['Timeout', StatusCode.TIMEOUT, HTTPTimeoutError],
        ['Internal Server', StatusCode.INTERNAL_SERVER_ERROR, HTTPInternalServerError],
        ['Unknown', 504, HTTPError],
      ])('should throw an HTTP exception on %s error', async (_name, status, error) => {
        // Arrange
        const path = '/homepage';
        const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiConfig;

        const mockValidator = new MockStrapiConfigValidator();
        const mockAuthManager = new MockAuthManager();

        const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

        jest
          .spyOn(MockHttpClient.prototype, 'fetch')
          // Simulate an error in the http client low-level fetch
          .mockImplementationOnce(() => Promise.resolve(new Response(null, { status })));

        // Act & Assert
        await expect(sdk.fetch(path)).rejects.toThrow(error);
      });
    });

    describe('Auth', () => {
      it('should ensure the user is pre-authenticated before a fetch is executed', async () => {
        // Arrange
        const config = {
          baseURL: 'https://localhost:1337/api',
          auth: { strategy: MockAuthProvider.identifier },
        } satisfies StrapiConfig;

        const mockValidator = new MockStrapiConfigValidator();
        const mockAuthManager = new MockAuthManager();

        const authenticateSpy = jest.spyOn(MockAuthManager.prototype, 'authenticate');

        const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

        // Act
        await sdk.fetch('/');

        // Assert
        expect(authenticateSpy).toHaveBeenCalledWith(expect.any(HttpClient));
      });

      it('should authenticates outgoing HTTP requests by injecting authentication-specific headers', async () => {
        // Arrange
        const config = {
          baseURL: 'https://localhost:1337/api',
          auth: { strategy: MockAuthProvider.identifier },
        } satisfies StrapiConfig;

        const mockValidator = new MockStrapiConfigValidator();
        const mockAuthManager = new MockAuthManager();

        const authenticateRequestSpy = jest.spyOn(MockAuthManager.prototype, 'authenticateRequest');

        const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

        // Act
        await sdk.fetch('/');

        // Assert
        expect(authenticateRequestSpy).toHaveBeenCalledWith(expect.any(Request));

        const { headers } = authenticateRequestSpy.mock.lastCall?.at(0) ?? {};

        expect(headers).toBeDefined();
        expect(headers).toBeInstanceOf(Headers);
        expect((headers as Headers).get('Authorization')).toBe('Bearer <token>');
      });

      it(`shouldn't authenticates outgoing HTTP requests if no auth strategy is set`, async () => {
        // Arrange
        const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiConfig;

        const mockValidator = new MockStrapiConfigValidator();
        const mockAuthManager = new MockAuthManager();

        const authenticateRequestSpy = jest.spyOn(MockAuthManager.prototype, 'authenticateRequest');

        const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

        // Act
        await sdk.fetch('/');

        // Assert
        expect(authenticateRequestSpy).toHaveBeenCalledWith(expect.any(Request));

        const { headers } = authenticateRequestSpy.mock.lastCall?.at(0) ?? {};

        expect(headers).toBeDefined();
        expect(headers).toBeInstanceOf(Headers);
        expect((headers as Headers).get('Authorization')).toBeNull();
      });

      it('fetch should handle 401 unauthorized responses', async () => {
        // Arrange
        const config = {
          baseURL: 'https://localhost:1337/api',
          auth: { strategy: MockAuthProvider.identifier },
        } satisfies StrapiConfig;

        const mockValidator = new MockStrapiConfigValidator();
        const mockAuthManager = new MockAuthManager();

        const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

        const spies = {
          authenticate: jest.spyOn(MockAuthManager.prototype, 'authenticate'),
          authenticateRequest: jest.spyOn(MockAuthManager.prototype, 'authenticateRequest'),
          handleUnauthorizedError: jest.spyOn(MockAuthManager.prototype, 'handleUnauthorizedError'),
        };

        jest
          .spyOn(MockHttpClient.prototype, 'fetch')
          // Simulate an 'Unauthorized' error in the http client low-level fetch
          .mockImplementation(() => Promise.resolve(new Response('Unauthorized', { status: 401 })));

        // Act & Assert
        await expect(sdk.fetch('/')).rejects.toThrow(HTTPAuthorizationError);

        expect(spies.authenticate).toHaveBeenCalledWith(expect.any(HttpClient));
        expect(spies.authenticateRequest).toHaveBeenCalledWith(expect.any(Request));

        expect(spies.handleUnauthorizedError).toHaveBeenCalled();

        // isAuthenticated should have been set to false by AuthManager.handleUnauthorizedError
        expect(mockAuthManager.isAuthenticated).toBe(false);
      });
    });
  });

  it('should fetch data correctly with fetch method', async () => {
    // Arrange
    const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiConfig;

    const requestSpy = jest.spyOn(MockHttpClient.prototype, 'request');

    const mockValidator = new MockStrapiConfigValidator();
    const mockAuthManager = new MockAuthManager();
    const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

    // Act
    const response = await sdk.fetch('/data');

    // Assert
    expect(requestSpy).toHaveBeenCalledWith('/data', undefined);
    await expect(response.json()).resolves.toEqual({ data: { id: 1 }, meta: {} });
  });

  it('should retrieve baseURL correctly from config', () => {
    // Arrange
    const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiConfig;

    const mockValidator = new MockStrapiConfigValidator();
    const mockAuthManager = new MockAuthManager();

    const sdk = new Strapi(config, mockValidator, mockAuthManager, mockHttpClientFactory);

    // Act
    const { baseURL } = sdk;

    // Assert
    expect(baseURL).toBe(config.baseURL);
  });
});
