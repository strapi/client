import { SingleTypeManager } from '../../../../src/content-types';
import { MockHttpClient } from '../../mocks';

describe('SingleTypeManager CRUD Methods', () => {
  const mockHttpClientFactory = (url: string) => new MockHttpClient({ baseURL: url });
  const config = { baseURL: 'http://localhost:1337/api' };
  const mockHttpClient = mockHttpClientFactory(config.baseURL);

  beforeEach(() => {
    jest
      .spyOn(MockHttpClient.prototype, 'request')
      .mockImplementation(() =>
        Promise.resolve(
          new Response(JSON.stringify({ data: { id: 1 }, meta: {} }), { status: 200 })
        )
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Simple Config', () => {
    let singleTypeManager: SingleTypeManager;

    beforeEach(() => {
      singleTypeManager = new SingleTypeManager({ resource: 'homepage' }, mockHttpClient);
    });

    it('should properly set resource and path properties', () => {
      expect(singleTypeManager).toHaveProperty('_resource', 'homepage');
      expect(singleTypeManager).toHaveProperty('_path', undefined);
      expect(singleTypeManager).toHaveProperty('_rootPath', '/homepage');
    });

    it('should return an object with CRUD methods for a single type', () => {
      expect(singleTypeManager).toHaveProperty('find', expect.any(Function));
      expect(singleTypeManager).toHaveProperty('update', expect.any(Function));
      expect(singleTypeManager).toHaveProperty('delete', expect.any(Function));
    });

    it('should fetch a single document with complex query params in find method', async () => {
      // Arrange
      const expected =
        '/homepage?locale=en&populate=sections&fields%5B0%5D=title&fields%5B1%5D=content';

      // Act
      await singleTypeManager.find({
        locale: 'en',
        populate: 'sections',
        fields: ['title', 'content'],
      });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(expected, { method: 'GET' });
    });

    it('should update an existing document with update method', async () => {
      // Arrange
      const payload = { title: 'Updated Title' };

      // Act
      await singleTypeManager.update(payload, { locale: 'en' });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith('/homepage?locale=en', {
        method: 'PUT',
        body: JSON.stringify({ data: payload }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should delete a document with delete method', async () => {
      // Act
      await singleTypeManager.delete({ locale: 'en' });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith('/homepage?locale=en', {
        method: 'DELETE',
      });
    });
  });

  describe('Custom Path Config', () => {
    let singleTypeManager: SingleTypeManager;

    beforeEach(() => {
      singleTypeManager = new SingleTypeManager(
        {
          resource: 'homepage',
          path: '/custom-homepage',
        },
        mockHttpClient
      );
    });

    it('should properly set resource and custom path properties', () => {
      expect(singleTypeManager).toHaveProperty('_resource', 'homepage');
      expect(singleTypeManager).toHaveProperty('_path', '/custom-homepage');
      expect(singleTypeManager).toHaveProperty('_rootPath', '/custom-homepage');
    });

    it('should use custom path when fetching document', async () => {
      // Arrange
      const expected = '/custom-homepage?locale=en';

      // Act
      await singleTypeManager.find({ locale: 'en' });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(expected, { method: 'GET' });
    });

    it('should use custom path when updating document', async () => {
      // Arrange
      const payload = { title: 'Updated Title' };

      // Act
      await singleTypeManager.update(payload, { locale: 'en' });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith('/custom-homepage?locale=en', {
        method: 'PUT',
        body: JSON.stringify({ data: payload }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should use custom path when deleting document', async () => {
      // Act
      await singleTypeManager.delete({ locale: 'en' });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith('/custom-homepage?locale=en', {
        method: 'DELETE',
      });
    });
  });

  describe('Plugin Support', () => {
    beforeEach(() => {
      jest
        .spyOn(MockHttpClient.prototype, 'request')
        .mockImplementation(() =>
          Promise.resolve(
            new Response(JSON.stringify({ id: 1, setting: 'value' }), { status: 200 })
          )
        );
    });

    it('should NOT wrap data when plugin is set to "users-permissions"', async () => {
      // Arrange
      const settingsManager = new SingleTypeManager(
        { resource: 'settings', plugin: { name: 'users-permissions', prefix: '' } },
        mockHttpClient
      );
      const payload = { setting1: 'value1', setting2: 'value2' };

      // Act
      await settingsManager.update(payload);

      // Assert - Should send raw payload without data wrapping
      expect(mockHttpClient.request).toHaveBeenCalledWith('/settings', {
        method: 'PUT',
        body: JSON.stringify(payload), // No { data: payload } wrapping
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should wrap data for regular single-types', async () => {
      // Arrange
      const homepageManager = new SingleTypeManager({ resource: 'homepage' }, mockHttpClient);
      const payload = { title: 'Home', content: 'Welcome' };

      // Act
      await homepageManager.update(payload);

      // Assert - Should wrap payload in data object
      expect(mockHttpClient.request).toHaveBeenCalledWith('/homepage', {
        method: 'PUT',
        body: JSON.stringify({ data: payload }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should support plugin route prefixing', async () => {
      // Arrange
      const settingsManager = new SingleTypeManager(
        { resource: 'settings', plugin: { name: 'my-plugin' } },
        mockHttpClient
      );

      // Act
      await settingsManager.find();

      // Assert - Should prefix route with plugin name
      expect(mockHttpClient.request).toHaveBeenCalledWith('/my-plugin/settings', {
        method: 'GET',
      });
    });
  });
});
