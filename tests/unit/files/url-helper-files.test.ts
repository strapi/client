import { describe, it, expect } from 'vitest';

import { FileQueryParams } from '../../../src/files/types';
import { URLHelper } from '../../../src/utilities';

describe('URLHelper for File Operations', () => {
  describe('appendQueryParams for file queries', () => {
    it('should append basic file filters correctly', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const queryParams: FileQueryParams = {
        filters: { mime: { $contains: 'image' } },
      };

      // Act
      const result = URLHelper.appendQueryParams(baseUrl, queryParams);

      // Assert
      expect(result).toContain('/upload/files?');
      expect(result).toContain('filters%5Bmime%5D%5B%24contains%5D=image');
    });

    it('should append file name filters correctly', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const queryParams: FileQueryParams = {
        filters: { name: { $contains: 'profile' } },
      };

      // Act
      const result = URLHelper.appendQueryParams(baseUrl, queryParams);

      // Assert
      expect(result).toContain('filters%5Bname%5D%5B%24contains%5D=profile');
    });

    it('should append multiple file filters correctly', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const queryParams: FileQueryParams = {
        filters: {
          mime: { $contains: 'image' },
          name: { $contains: 'profile' },
        },
      };

      // Act
      const result = URLHelper.appendQueryParams(baseUrl, queryParams);

      // Assert
      expect(result).toContain('filters%5Bmime%5D%5B%24contains%5D=image');
      expect(result).toContain('filters%5Bname%5D%5B%24contains%5D=profile');
    });

    it('should append single sort parameter correctly', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const queryParams: FileQueryParams = {
        sort: 'name:asc',
      };

      // Act
      const result = URLHelper.appendQueryParams(baseUrl, queryParams);

      // Assert
      expect(result).toBe('/upload/files?sort=name%3Aasc');
    });

    it('should append array of sort parameters correctly', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const queryParams: FileQueryParams = {
        sort: ['name:asc', 'createdAt:desc'],
      };

      // Act
      const result = URLHelper.appendQueryParams(baseUrl, queryParams);

      // Assert
      expect(result).toContain('sort%5B0%5D=name%3Aasc');
      expect(result).toContain('sort%5B1%5D=createdAt%3Adesc');
    });

    it('should handle both filters and sort together for file queries', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const queryParams: FileQueryParams = {
        filters: { mime: { $contains: 'image' } },
        sort: 'name:asc',
      };

      // Act
      const result = URLHelper.appendQueryParams(baseUrl, queryParams);

      // Assert
      expect(result).toContain('filters%5Bmime%5D%5B%24contains%5D=image');
      expect(result).toContain('sort=name%3Aasc');
    });

    it('should handle empty filters object', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const queryParams: FileQueryParams = {
        filters: {},
      };

      // Act
      const result = URLHelper.appendQueryParams(baseUrl, queryParams);

      // Assert
      expect(result).toBe('/upload/files');
    });

    it('should handle complex filtering with multiple conditions', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const queryParams: FileQueryParams = {
        filters: {
          $or: [{ mime: { $contains: 'image' } }, { mime: { $contains: 'pdf' } }],
          size: { $gt: 1000 },
        },
      };

      // Act
      const result = URLHelper.appendQueryParams(baseUrl, queryParams);

      // Assert
      expect(result).toContain('filters%5B%24or%5D%5B0%5D%5Bmime%5D%5B%24contains%5D=image');
      expect(result).toContain('filters%5B%24or%5D%5B1%5D%5Bmime%5D%5B%24contains%5D=pdf');
      expect(result).toContain('filters%5Bsize%5D%5B%24gt%5D=1000');
    });

    it('should append file ID to URL for findOne operations', () => {
      // Arrange
      const baseUrl = '/upload/files';
      const fileId = 123;

      // Act
      const result = `${baseUrl}/${fileId}`;

      // Assert
      expect(result).toBe('/upload/files/123');
    });
  });

  describe('stringifyQueryParams for file operations', () => {
    it('should stringify file filters correctly', () => {
      // Arrange
      const queryParams: FileQueryParams = {
        filters: { mime: { $contains: 'image' } },
      };

      // Act
      const result = URLHelper.stringifyQueryParams(queryParams);

      // Assert
      expect(result).toContain('filters%5Bmime%5D%5B%24contains%5D=image');
    });

    it('should stringify file sort parameter correctly', () => {
      // Arrange
      const queryParams: FileQueryParams = {
        sort: 'name:asc',
      };

      // Act
      const result = URLHelper.stringifyQueryParams(queryParams);

      // Assert
      expect(result).toBe('sort=name%3Aasc');
    });

    it('should stringify array of sort parameters correctly', () => {
      // Arrange
      const queryParams: FileQueryParams = {
        sort: ['name:asc', 'createdAt:desc'],
      };

      // Act
      const result = URLHelper.stringifyQueryParams(queryParams);

      // Assert
      expect(result).toContain('sort%5B0%5D=name%3Aasc');
      expect(result).toContain('sort%5B1%5D=createdAt%3Adesc');
    });
  });
});
