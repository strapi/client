import { CollectionTypeManager } from '../../../../src/content-types';
import { MockHttpClient } from '../../mocks';

describe('CollectionTypeManager CRUD Methods', () => {
  const mockHttpClient = new MockHttpClient({ baseURL: 'http://localhost:1337' });

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

  it('should return an object with CRUD methods for a collection type', () => {
    const collectionManager = new CollectionTypeManager({ resource: 'articles' }, mockHttpClient);

    expect(collectionManager).toHaveProperty('find', expect.any(Function));
    expect(collectionManager).toHaveProperty('findOne', expect.any(Function));
    expect(collectionManager).toHaveProperty('create', expect.any(Function));
    expect(collectionManager).toHaveProperty('update', expect.any(Function));
    expect(collectionManager).toHaveProperty('delete', expect.any(Function));
  });

  describe('Simple Config', () => {
    let collectionManager: CollectionTypeManager;

    beforeEach(() => {
      collectionManager = new CollectionTypeManager({ resource: 'articles' }, mockHttpClient);
    });

    it('should properly set collection and path properties', () => {
      expect(collectionManager).toHaveProperty('_resource', 'articles');
      expect(collectionManager).toHaveProperty('_path', undefined);
      expect(collectionManager).toHaveProperty('_rootPath', '/articles');
    });

    it('should append complex query params correctly in find method', async () => {
      // Arrange
      const expected =
        '/articles?locale=en&populate=author&fields%5B0%5D=title&fields%5B1%5D=description&filters%5Bpublished%5D=true&sort=createdAt%3Adesc&pagination%5Bpage%5D=1&pagination%5BpageSize%5D=10';

      jest.spyOn(MockHttpClient.prototype, 'request').mockImplementationOnce(() =>
        Promise.resolve(
          new Response(JSON.stringify({ data: [{ id: 1 }, { id: 2 }], meta: {} }), {
            status: 200,
          })
        )
      );

      // Act
      await collectionManager.find({
        locale: 'en',
        populate: 'author',
        fields: ['title', 'description'],
        filters: { published: true },
        sort: 'createdAt:desc',
        pagination: { page: 1, pageSize: 10 },
      });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(expected, { method: 'GET' });
    });

    it('should fetch a single document with complex query params in findOne method', async () => {
      // Arrange
      const expected =
        '/articles/1?locale=en&populate=comments&fields%5B0%5D=title&fields%5B1%5D=content';

      // Act
      await collectionManager.findOne('1', {
        locale: 'en',
        populate: 'comments',
        fields: ['title', 'content'],
      });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(expected, { method: 'GET' });
    });

    it('should create a new document with create method', async () => {
      // Arrange
      const payload = { title: 'New Article' };

      // Act
      await collectionManager.create(payload, { locale: 'en' });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith('/articles?locale=en', {
        method: 'POST',
        body: JSON.stringify({ data: payload }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should update an existing document with update method', async () => {
      // Arrange
      const payload = { title: 'Updated Title' };

      // Act
      await collectionManager.update('1', payload, { locale: 'en' });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith('/articles/1?locale=en', {
        method: 'PUT',
        body: JSON.stringify({ data: payload }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should delete a document with delete method', async () => {
      // Act
      await collectionManager.delete('1', { locale: 'en' });

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith('/articles/1?locale=en', {
        method: 'DELETE',
      });
    });
  });

  describe('With Custom Path', () => {
    const customPath = '/custom-path';
    let collectionManager: CollectionTypeManager;

    beforeEach(() => {
      collectionManager = new CollectionTypeManager(
        { resource: 'articles', path: customPath },
        mockHttpClient
      );
    });

    it('should properly set collection and path properties', () => {
      expect(collectionManager).toHaveProperty('_resource', 'articles');
      expect(collectionManager).toHaveProperty('_path', customPath);
      expect(collectionManager).toHaveProperty('_rootPath', customPath);
    });

    it('should use the custom path when using .find', async () => {
      // Act
      await collectionManager.find();

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(customPath, { method: 'GET' });
    });

    it('should use the custom path when using .findOne', async () => {
      // Arrange
      const id = '42';

      // Act
      await collectionManager.findOne(id);

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(`${customPath}/${id}`, { method: 'GET' });
    });

    it('should use the custom path when using .create', async () => {
      // Arrange
      const payload = { foo: 'bar' };

      // Act
      await collectionManager.create(payload);

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(
        `${customPath}`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ data: payload }),
        })
      );
    });

    it('should use the custom path when using .update', async () => {
      // Arrange
      const payload = { foo: 'baz' };
      const id = '42';

      // Act
      await collectionManager.update(id, payload);

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(
        `${customPath}/${id}`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ data: payload }),
        })
      );
    });

    it('should use the custom path when using .delete', async () => {
      // Arrange
      const id = '42';

      // Act
      await collectionManager.delete(id);

      // Assert
      expect(mockHttpClient.request).toHaveBeenCalledWith(`${customPath}/${id}`, {
        method: 'DELETE',
      });
    });
  });
});
