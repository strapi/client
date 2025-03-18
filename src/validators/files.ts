import { FileQueryParams } from '../files/types';

/**
 * Validates file query parameters to ensure they match expected format.
 *
 * @param queryParams - The parameters to validate
 * @throws {Error} if any parameters have invalid format
 */
export const validateFileQueryParams = (queryParams: FileQueryParams): void => {
  if (!queryParams) return;

  // Validate filters
  if (queryParams.filters !== undefined && typeof queryParams.filters !== 'object') {
    throw new Error(
      `Invalid 'filters' parameter: must be an object, received ${typeof queryParams.filters}. Example: { mime: { $contains: 'image' } }`
    );
  }

  // Validate sort
  if (queryParams.sort !== undefined) {
    if (typeof queryParams.sort !== 'string' && !Array.isArray(queryParams.sort)) {
      throw new Error(
        `Invalid 'sort' parameter: must be a string or array of strings, received ${typeof queryParams.sort}. Examples: 'name:asc' or ['name:asc', 'createdAt:desc']`
      );
    }

    if (Array.isArray(queryParams.sort)) {
      for (const [index, sortItem] of queryParams.sort.entries()) {
        if (typeof sortItem !== 'string') {
          throw new Error(
            `Invalid 'sort' parameter: array item at position ${index} must be a string, received ${typeof sortItem}. Example format: 'fieldName:asc' or 'fieldName:desc'`
          );
        }
      }
    }
  }
};

/**
 * Validates a file ID to ensure it is a positive number.
 *
 * @param fileId - The file ID to validate
 * @throws {Error} if the file ID is invalid
 */
export const validateFileId = (fileId: number): void => {
  if (typeof fileId !== 'number') {
    throw new Error(`Invalid file ID: expected a number, received ${typeof fileId}.`);
  }

  if (isNaN(fileId)) {
    throw new Error(`Invalid file ID: received NaN. File ID must be a valid number.`);
  }

  if (!Number.isInteger(fileId)) {
    throw new Error(`Invalid file ID: ${fileId}. File ID must be an integer.`);
  }

  if (fileId <= 0) {
    throw new Error(
      `Invalid file ID: ${fileId}. File ID must be a positive number greater than zero.`
    );
  }
};
