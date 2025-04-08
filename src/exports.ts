/**
 * This file is used to export all the public symbols for the Strapi Client API.
 */

import type { StrapiClient, StrapiClientConfig } from './client';

// ############################
// #      Main Client API     #
// ############################

export { strapi, type Config } from './index';

// ############################
// #      Error Classes       #
// ############################

export * from './errors';

// ############################
// #   Public Utility Types   #
// ############################

export type { StrapiClientConfig, StrapiClient } from './client';
export type { CollectionTypeManager, SingleTypeManager } from './content-types';
export type { FilesManager, FileQueryParams, FileResponse, FileListResponse } from './files';

// ############################
// #    Deprecated symbols    #
// # (backward compatibility) #
// ############################

/**
 * @deprecated This type will be removed in v2, consider using {@link StrapiClientConfig} as a replacement
 */
export type StrapiConfig = StrapiClientConfig;

/**
 * @deprecated This type will be removed in v2, consider using {@link StrapiClient} as a replacement
 */
export type Strapi = StrapiClient;
