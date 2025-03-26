import { HTTPError, HTTPNotFoundError } from '../errors';

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
export class FileForbiddenError extends FileError {
  public name = 'FileForbiddenError';
}
