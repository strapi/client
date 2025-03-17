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
    throw new Error('Invalid filters parameter: must be an object');
  }

  // Validate sort
  if (queryParams.sort !== undefined) {
    if (typeof queryParams.sort !== 'string' && !Array.isArray(queryParams.sort)) {
      throw new Error('Invalid sort parameter: must be a string or array of strings');
    }

    if (Array.isArray(queryParams.sort)) {
      for (const sortItem of queryParams.sort) {
        if (typeof sortItem !== 'string') {
          throw new Error('Invalid sort parameter: array items must be strings');
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
  if (!fileId || isNaN(fileId) || fileId <= 0) {
    throw new Error(`Invalid file ID: ${fileId}. File ID must be a positive number.`);
  }
};
