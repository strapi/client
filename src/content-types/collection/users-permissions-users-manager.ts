import { CollectionTypeManager } from './manager';

import type * as API from '../../types/content-api';

/**
 * Specialized manager for users-permissions `users` collection.
 * Runtime behavior is inherited from CollectionTypeManager.
 */
export class UsersPermissionsUsersManager extends CollectionTypeManager {}

/**
 * Augmented method signatures for users-permissions `users` to accept numeric IDs
 */
export type UsersPermissionsUsersIdOverloads = {
  findOne(id: number, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse>;
  update(
    id: number,
    data: Record<string, unknown>,
    queryParams?: API.BaseQueryParams
  ): Promise<API.DocumentResponse>;
  delete(id: number, queryParams?: API.BaseQueryParams): Promise<void>;
};
