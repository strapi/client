/**
 * Parameters for querying files in the Strapi upload plugin.
 */
export interface FileQueryParams {
  /**
   * Filters to apply to the query.
   * Example: { name: { $contains: 'example' } }
   */
  filters?: Record<string, any>;

  /**
   * Sorting criteria for the query.
   * Example: ['name:asc']
   */
  sort?: string | string[];

  // TODO cannot apply pagination through the upload plugin content API routes?
  /**
   * Pagination settings for the query.
   */
  // pagination?: {
  //   page?: number;
  //   pageSize?: number;
  // };
}

/**
 * Response structure for a single file.
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
 */
export type FileListResponse = Array<FileResponse>;

// TODO confirm format of response from upload plugin
// export interface FileListResponse {
//   data: Array<FileResponse>;
//   meta?: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }
