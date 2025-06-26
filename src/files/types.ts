/**
 * Parameters for querying files in the Strapi upload plugin.
 *
 * Note: The upload plugin uses a different API structure than the content API
 * and doesn't support the standard pagination parameters.
 */
export interface FileQueryParams {
  /**
   * Filters to apply to the query.
   * Example: { name: { $contains: 'example' } }
   */
  filters?: Record<string, any>;

  /**
   * Sorting criteria for the query.
   * Example: ['name:asc'] or 'name:asc'
   */
  sort?: string | string[];
}

/**
 * Interface defining the fields that can be updated for a file.
 */
export interface FileUpdateData {
  name?: string;
  alternativeText?: string;
  caption?: string;
}

/**
 * Options for file upload operations.
 * Required when uploading Buffer data to ensure proper file type detection.
 */
export interface FileUploadOptions {
  filename?: string;
  mimetype?: string;
  fileInfo?: FileUpdateData;
}

/**
 * Response structure for a single file from the Strapi upload plugin.
 * This interface represents the actual response structure from the API.
 */
export interface FileResponse {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  url: string;
  size: number;
  provider: string;
  previewUrl: string | null;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  formats?: any;
  folderPath?: string;
}

/**
 * Response structure for a list of files.
 *
 * Note: Unlike the core content API, the upload plugin returns a flat array of files
 * without the data/meta structure used in the core content API responses.
 */
export type FileListResponse = Array<FileResponse>;

/**
 * Response structure for file uploads.
 */
export type MediaUploadResponse = Array<FileResponse>;
