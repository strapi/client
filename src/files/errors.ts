import { HTTPError, HTTPNotFoundError, HTTPForbiddenError } from '../errors';

/**
 * Base error class for file-related errors.
 * Extends the generic HTTPError class to provide more context for file operations.
 */
export class FileError extends HTTPError {
  public name = 'FileError';
}

/**
 * Error thrown when a file is not found.
 */
export class FileNotFoundError extends HTTPNotFoundError {
  public name = 'FileNotFoundError';
  public fileId: number;

  constructor(fileId: number, originalError: HTTPNotFoundError) {
    super(originalError.response, originalError.request);
    this.fileId = fileId;
    this.message = `File with ID ${fileId} not found. The requested file may have been deleted or never existed.`;
  }
}

/**
 * Error thrown when a file operation encounters a permission issue.
 */
export class FileForbiddenError extends HTTPForbiddenError {
  public name = 'FileForbiddenError';
  public fileId?: number;

  /**
   * Creates a new FileForbiddenError instance.
   *
   * @param originalError - The original HTTP forbidden error.
   * @param fileId - Optional file ID to include in the error message.
   */
  constructor(originalError: HTTPForbiddenError, fileId?: number) {
    super(originalError.response, originalError.request);
    this.fileId = fileId;
    this.message =
      fileId !== undefined
        ? `Access to file with ID ${fileId} is forbidden. You may not have sufficient permissions.`
        : `Access to files is forbidden. You may not have sufficient permissions.`;
  }
}

/**
 * Factory for creating error mappers for file operations.
 */
export class FileErrorMapper {
  /**
   * Creates an error mapper function for a specific file ID.
   *
   * @param fileId - The file ID to include in error messages, optional.
   * @returns A function that maps HTTP errors to domain-specific file errors.
   */
  static createMapper(fileId?: number) {
    return (error: Error): Error | null => {
      if (error instanceof HTTPNotFoundError) {
        return fileId !== undefined ? new FileNotFoundError(fileId, error) : null;
      }

      if (error instanceof HTTPForbiddenError) {
        return new FileForbiddenError(error, fileId);
      }

      return null;
    };
  }
}
