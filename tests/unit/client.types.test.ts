import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { StrapiClient } from '../../src/client';
import { paths } from '../fixtures/test-typed-client';

import {
  MockAuthManager,
  MockAuthProvider,
  MockHttpClient,
  MockStrapiConfigValidator,
} from './mocks';

import type { StrapiClientConfig } from '../../src/client';
import type { HttpClientConfig } from '../../src/http';

describe('Strapi Typings', () => {
  const mockHttpClientFactory = (config: HttpClientConfig) => new MockHttpClient(config);

  beforeEach(() => {
    vi.spyOn(MockHttpClient.prototype, 'fetch').mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify({ data: { id: 1 }, meta: {} }), { status: 200 }))
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with valid config', () => {
      // Arrange
      const config = {
        baseURL: 'https://localhost:1337/api',
        auth: { strategy: MockAuthProvider.identifier },
      } satisfies StrapiClientConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const validatorSpy = vi.spyOn(mockValidator, 'validateConfig');
      const authSetStrategySpy = vi.spyOn(MockAuthManager.prototype, 'setStrategy');

      // Act
      const client = new StrapiClient<paths>(
        config,
        mockValidator,
        mockAuthManager,
        mockHttpClientFactory
      );

      // Assert

      expect(client).toBeInstanceOf(StrapiClient);
      expect(validatorSpy).toHaveBeenCalledWith(config);
      expect(authSetStrategySpy).toHaveBeenCalledWith(MockAuthProvider.identifier, undefined);
    });
  });

  describe('Typed Fetch', () => {
    it('fetch should accept a path and return a typed response', async () => {
      // Arrange
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiClientConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const client = new StrapiClient<paths>(
        config,
        mockValidator,
        mockAuthManager,
        mockHttpClientFactory
      );

      const fetchSpy = vi.spyOn(MockHttpClient.prototype, 'fetch');

      // Act
      await client.fetch('/tests');
      const requestInfo = fetchSpy.mock.lastCall?.[0];

      // Assert
      expect(requestInfo).toBeInstanceOf(Request);
      expect(requestInfo).toHaveProperty('headers', expect.any(Headers));

      const { headers } = requestInfo as Request;

      expect(headers).toBeDefined();
      expect((headers as Headers).get('Content-Type')).toBe('application/json');
    });

    it('fetch works with path parameters', async () => {
      // Arrange
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiClientConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const client = new StrapiClient<paths>(
        config,
        mockValidator,
        mockAuthManager,
        mockHttpClientFactory
      );

      const fetchSpy = vi.spyOn(MockHttpClient.prototype, 'fetch');

      // Act
      await client.fetch('/tests/{id}', {
        parameters: {
          path: { id: 'TEST' },
        },
      });
      const requestInfo = fetchSpy.mock.lastCall?.[0];

      // Assert
      expect(requestInfo).toBeInstanceOf(Request);
      expect(requestInfo).toHaveProperty('url', expect.stringContaining('/tests/TEST'));
    });

    it('fetch url with path parameters without providing init', async () => {
      // Arrange
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiClientConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const client = new StrapiClient<paths>(
        config,
        mockValidator,
        mockAuthManager,
        mockHttpClientFactory
      );

      const fetchSpy = vi.spyOn(MockHttpClient.prototype, 'fetch');

      // Act
      await client.fetch('/tests/{id}');
      const requestInfo = fetchSpy.mock.lastCall?.[0];

      // Assert
      expect(requestInfo).toBeInstanceOf(Request);
      expect(requestInfo).toHaveProperty(
        'url',
        expect.stringContaining('/tests/' + encodeRFC3986URIComponent('{id}'))
      );
    });

    it('fetch works with query parameters', async () => {
      // Arrange
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiClientConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const client = new StrapiClient<paths>(
        config,
        mockValidator,
        mockAuthManager,
        mockHttpClientFactory
      );

      const fetchSpy = vi.spyOn(MockHttpClient.prototype, 'fetch');

      // Act
      await client.fetch('/tests/{id}', {
        parameters: {
          path: { id: 'TEST' },
          query: { fields: ['test'], populate: '*' },
        },
      });
      const requestInfo = fetchSpy.mock.lastCall?.[0];

      // Assert
      expect(requestInfo).toBeInstanceOf(Request);
      expect(requestInfo).toHaveProperty('url', expect.stringContaining('/tests/TEST'));
      expect(requestInfo).toHaveProperty(
        'url',
        expect.stringContaining(
          encodeRFC3986URIComponent('fields[]') + '=' + encodeRFC3986URIComponent('test')
        )
      );
      expect(requestInfo).toHaveProperty(
        'url',
        expect.stringContaining(
          encodeRFC3986URIComponent('populate') + '=' + encodeRFC3986URIComponent('*')
        )
      );
    });

    it('fetch works with object body', async () => {
      // Arrange
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiClientConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const client = new StrapiClient<paths>(
        config,
        mockValidator,
        mockAuthManager,
        mockHttpClientFactory
      );

      const fetchSpy = vi.spyOn(MockHttpClient.prototype, 'fetch');

      // Act
      await client.fetch('/auth/local', {
        method: 'post',
        body: { identifier: 'demo_user', password: 'demo_password' },
      });
      const requestInfo = fetchSpy.mock.lastCall?.[0] as Request;

      // Assert
      expect(requestInfo).toBeInstanceOf(Request);
      expect(requestInfo).toHaveProperty('url', expect.stringContaining('/auth/local'));
      expect(requestInfo).toHaveProperty('headers', expect.any(Headers));

      const { headers } = requestInfo as Request;

      expect(headers).toBeDefined();
      expect((headers as Headers).get('Content-Type')).toBe('application/json');

      const body = await requestInfo.json();
      expect(body).toEqual({ identifier: 'demo_user', password: 'demo_password' });
    });

    it('fetch works with FormData', async () => {
      // Arrange
      const config = { baseURL: 'https://localhost:1337/api' } satisfies StrapiClientConfig;

      const mockValidator = new MockStrapiConfigValidator();
      const mockAuthManager = new MockAuthManager();

      const client = new StrapiClient<paths>(
        config,
        mockValidator,
        mockAuthManager,
        mockHttpClientFactory
      );

      const fetchSpy = vi.spyOn(MockHttpClient.prototype, 'fetch');
      const data = new FormData();
      data.append('file', new Blob(['file content'], { type: 'text/plain' }), 'test.txt');

      // Act
      await client.fetch('/', {
        method: 'post',
        body: data,
      });
      const requestInfo = fetchSpy.mock.lastCall?.[0] as Request;

      // Assert
      expect(requestInfo).toBeInstanceOf(Request);
      expect(requestInfo).toHaveProperty('url', expect.stringContaining('/'));
      expect(requestInfo).toHaveProperty('headers', expect.any(Headers));

      const { headers } = requestInfo as Request;

      expect(headers).toBeDefined();
      expect((headers as Headers).get('Content-Type')).toContain('multipart/form-data');

      const body = await requestInfo.text();
      expect(body).toContain('formdata');
      expect(body).toContain('Content-Disposition: form-data; name="file"; filename="test.txt"');
      expect(body).toContain('Content-Type: text/plain');
    });
  });
});

function encodeRFC3986URIComponent(str: string): string {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}
