import { Config, strapi } from '@strapi/client';

export interface paths {
  '/tests': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['test/get/tests'];
    put?: never;
    post: operations['test/post/tests'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/tests/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['test/get/tests_by_id'];
    put: operations['test/put/tests_by_id'];
    post?: never;
    delete: operations['test/delete/tests_by_id'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/content-types': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['content-type-builder/get/content_types'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/content-types/{uid}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['content-type-builder/get/content_types_by_uid'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/components': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['content-type-builder/get/components'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/components/{uid}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['content-type-builder/get/components_by_uid'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['upload/post'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/files': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['upload/get/files'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/files/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['upload/get/files_by_id'];
    put?: never;
    post?: never;
    delete: operations['upload/delete/files_by_id'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/locales': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['i18n/get/locales'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/connect/(.*)': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/connect_____'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/local': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['users-permissions/post/auth_local'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/local/register': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['users-permissions/post/auth_local_register'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/{provider}/callback': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/auth_by_provider_callback'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/forgot-password': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['users-permissions/post/auth_forgot_password'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/reset-password': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['users-permissions/post/auth_reset_password'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/email-confirmation': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/auth_email_confirmation'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/send-email-confirmation': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['users-permissions/post/auth_send_email_confirmation'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/change-password': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['users-permissions/post/auth_change_password'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/refresh': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['users-permissions/post/auth_refresh'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/logout': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['users-permissions/post/auth_logout'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/users/count': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/users_count'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/users': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/users'];
    put?: never;
    post: operations['users-permissions/post/users'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/users/me': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/users_me'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/users/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/users_by_id'];
    put: operations['users-permissions/put/users_by_id'];
    post?: never;
    delete: operations['users-permissions/delete/users_by_id'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/roles/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/roles_by_id'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/roles': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/roles'];
    put?: never;
    post: operations['users-permissions/post/roles'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/roles/{role}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations['users-permissions/put/roles_by_role'];
    post?: never;
    delete: operations['users-permissions/delete/roles_by_role'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/permissions': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['users-permissions/get/permissions'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  'test/get/tests': {
    parameters: {
      query?: {
        fields?: ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')[];
        filters?: {
          [key: string]: unknown;
        };
        _q?: string;
        pagination?: {
          /** @description Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /** @description Page number (1-based) */
              page: number;
              /** @description Number of entries per page */
              pageSize: number;
            }
          | {
              /** @description Number of entries to skip */
              start: number;
              /** @description Maximum number of entries to return */
              limit: number;
            }
        );
        sort?:
          | ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')
          | ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')[]
          | {
              [key: string]: 'asc' | 'desc';
            }
          | {
              [key: string]: 'asc' | 'desc';
            }[];
        populate?: '*' | 'others' | 'others'[];
        status?: 'draft' | 'published';
        hasPublishedVersion?: boolean | ('true' | 'false');
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              /**
               * Format: uuid
               * @description The document ID, represented by a UUID
               */
              documentId: string;
              id: string | number;
              /** @description A string field */
              test: string;
              /** @description A datetime field */
              createdAt?: string;
              /** @description A datetime field */
              updatedAt?: string;
              /**
               * @description A datetime field
               * @default 2026-03-01T18:13:17.245Z
               */
              publishedAt: string;
              others: unknown;
            }[];
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'test/post/tests': {
    parameters: {
      query?: {
        fields?: ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')[];
        populate?: '*' | 'others' | 'others'[];
        status?: 'draft' | 'published';
        hasPublishedVersion?: boolean | ('true' | 'false');
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          data: {
            /** @description A string field */
            test: string;
            /**
             * @description A datetime field
             * @default 2026-03-01T18:13:17.255Z
             */
            publishedAt: string;
            /**
             * Format: uuid
             * @description A relational field
             */
            others?: string;
          };
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              /**
               * Format: uuid
               * @description The document ID, represented by a UUID
               */
              documentId: string;
              id: string | number;
              /** @description A string field */
              test: string;
              /** @description A datetime field */
              createdAt?: string;
              /** @description A datetime field */
              updatedAt?: string;
              /**
               * @description A datetime field
               * @default 2026-03-01T18:13:17.256Z
               */
              publishedAt: string;
              others: unknown;
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'test/get/tests_by_id': {
    parameters: {
      query?: {
        fields?: ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')[];
        populate?: '*' | 'others' | 'others'[];
        filters?: {
          [key: string]: unknown;
        };
        sort?:
          | ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')
          | ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')[]
          | {
              [key: string]: 'asc' | 'desc';
            }
          | {
              [key: string]: 'asc' | 'desc';
            }[];
        status?: 'draft' | 'published';
        hasPublishedVersion?: boolean | ('true' | 'false');
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              /**
               * Format: uuid
               * @description The document ID, represented by a UUID
               */
              documentId: string;
              id: string | number;
              /** @description A string field */
              test: string;
              /** @description A datetime field */
              createdAt?: string;
              /** @description A datetime field */
              updatedAt?: string;
              /**
               * @description A datetime field
               * @default 2026-03-01T18:13:17.251Z
               */
              publishedAt: string;
              others: unknown;
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'test/put/tests_by_id': {
    parameters: {
      query?: {
        fields?: ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')[];
        populate?: '*' | 'others' | 'others'[];
        status?: 'draft' | 'published';
        hasPublishedVersion?: boolean | ('true' | 'false');
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          data: {
            /** @description A string field */
            test?: string;
            /**
             * @description A datetime field
             * @default 2026-03-01T18:13:17.259Z
             */
            publishedAt?: string;
            /**
             * Format: uuid
             * @description A relational field
             */
            others?: string;
          };
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              /**
               * Format: uuid
               * @description The document ID, represented by a UUID
               */
              documentId: string;
              id: string | number;
              /** @description A string field */
              test: string;
              /** @description A datetime field */
              createdAt?: string;
              /** @description A datetime field */
              updatedAt?: string;
              /**
               * @description A datetime field
               * @default 2026-03-01T18:13:17.260Z
               */
              publishedAt: string;
              others: unknown;
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'test/delete/tests_by_id': {
    parameters: {
      query?: {
        fields?: ('test' | 'createdAt' | 'updatedAt' | 'publishedAt')[];
        populate?: '*' | 'others' | 'others'[];
        filters?: {
          [key: string]: unknown;
        };
        status?: 'draft' | 'published';
        hasPublishedVersion?: boolean | ('true' | 'false');
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              /**
               * Format: uuid
               * @description The document ID, represented by a UUID
               */
              documentId: string;
              id: string | number;
              /** @description A string field */
              test: string;
              /** @description A datetime field */
              createdAt?: string;
              /** @description A datetime field */
              updatedAt?: string;
              /**
               * @description A datetime field
               * @default 2026-03-01T18:13:17.263Z
               */
              publishedAt: string;
              others: unknown;
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'content-type-builder/get/content_types': {
    parameters: {
      query: {
        kind: 'collectionType' | 'singleType';
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              uid: string;
              plugin?: string;
              apiID: string;
              schema: {
                displayName: string;
                singularName: string;
                pluralName: string;
                description: string;
                draftAndPublish: boolean;
                /** @enum {string} */
                kind: 'collectionType' | 'singleType';
                collectionName?: string;
                attributes: {
                  [key: string]:
                    | {
                        /** @constant */
                        type: 'media';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        multiple: boolean;
                        required?: boolean;
                        allowedTypes?: string[];
                      }
                    | {
                        /** @constant */
                        type: 'relation';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        relation: string;
                        target: string;
                        targetAttribute: string | null;
                        autoPopulate?: boolean;
                        mappedBy?: string;
                        inversedBy?: string;
                      }
                    | {
                        /** @constant */
                        type: 'component';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        component: string;
                        repeatable: boolean;
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        /** @constant */
                        type: 'dynamiczone';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        components: string[];
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        /** @constant */
                        type: 'uid';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        targetField?: string;
                      }
                    | {
                        type: string;
                        required?: boolean;
                        unique?: boolean;
                        default?: unknown;
                        min?: number | string;
                        max?: number | string;
                        minLength?: number;
                        maxLength?: number;
                        enum?: string[];
                        regex?: string;
                        private?: boolean;
                        configurable?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                      };
                };
                visible: boolean;
                restrictRelationsTo: string[] | null;
                pluginOptions?: {
                  [key: string]: unknown;
                };
                options?: {
                  [key: string]: unknown;
                };
                reviewWorkflows?: boolean;
                populateCreatorFields?: boolean;
                comment?: string;
                version?: string;
              };
            }[];
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'content-type-builder/get/content_types_by_uid': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        uid: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              uid: string;
              plugin?: string;
              apiID: string;
              schema: {
                displayName: string;
                singularName: string;
                pluralName: string;
                description: string;
                draftAndPublish: boolean;
                /** @enum {string} */
                kind: 'collectionType' | 'singleType';
                collectionName?: string;
                attributes: {
                  [key: string]:
                    | {
                        /** @constant */
                        type: 'media';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        multiple: boolean;
                        required?: boolean;
                        allowedTypes?: string[];
                      }
                    | {
                        /** @constant */
                        type: 'relation';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        relation: string;
                        target: string;
                        targetAttribute: string | null;
                        autoPopulate?: boolean;
                        mappedBy?: string;
                        inversedBy?: string;
                      }
                    | {
                        /** @constant */
                        type: 'component';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        component: string;
                        repeatable: boolean;
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        /** @constant */
                        type: 'dynamiczone';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        components: string[];
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        /** @constant */
                        type: 'uid';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        targetField?: string;
                      }
                    | {
                        type: string;
                        required?: boolean;
                        unique?: boolean;
                        default?: unknown;
                        min?: number | string;
                        max?: number | string;
                        minLength?: number;
                        maxLength?: number;
                        enum?: string[];
                        regex?: string;
                        private?: boolean;
                        configurable?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                      };
                };
                visible: boolean;
                restrictRelationsTo: string[] | null;
                pluginOptions?: {
                  [key: string]: unknown;
                };
                options?: {
                  [key: string]: unknown;
                };
                reviewWorkflows?: boolean;
                populateCreatorFields?: boolean;
                comment?: string;
                version?: string;
              };
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'content-type-builder/get/components': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              uid: string;
              category: string;
              apiId: string;
              schema: {
                displayName: string;
                description: string;
                icon?: string;
                connection?: string;
                collectionName?: string;
                attributes: {
                  [key: string]:
                    | {
                        /** @constant */
                        type: 'media';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        multiple: boolean;
                        required?: boolean;
                        allowedTypes?: string[];
                      }
                    | {
                        /** @constant */
                        type: 'relation';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        relation: string;
                        target: string;
                        targetAttribute: string | null;
                        autoPopulate?: boolean;
                        mappedBy?: string;
                        inversedBy?: string;
                      }
                    | {
                        /** @constant */
                        type: 'component';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        component: string;
                        repeatable: boolean;
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        /** @constant */
                        type: 'dynamiczone';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        components: string[];
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        /** @constant */
                        type: 'uid';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        targetField?: string;
                      }
                    | {
                        type: string;
                        required?: boolean;
                        unique?: boolean;
                        default?: unknown;
                        min?: number | string;
                        max?: number | string;
                        minLength?: number;
                        maxLength?: number;
                        enum?: string[];
                        regex?: string;
                        private?: boolean;
                        configurable?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                      };
                };
                pluginOptions?: {
                  [key: string]: unknown;
                };
              };
            }[];
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'content-type-builder/get/components_by_uid': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        uid: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            data: {
              uid: string;
              category: string;
              apiId: string;
              schema: {
                displayName: string;
                description: string;
                icon?: string;
                connection?: string;
                collectionName?: string;
                attributes: {
                  [key: string]:
                    | {
                        /** @constant */
                        type: 'media';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        multiple: boolean;
                        required?: boolean;
                        allowedTypes?: string[];
                      }
                    | {
                        /** @constant */
                        type: 'relation';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        relation: string;
                        target: string;
                        targetAttribute: string | null;
                        autoPopulate?: boolean;
                        mappedBy?: string;
                        inversedBy?: string;
                      }
                    | {
                        /** @constant */
                        type: 'component';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        component: string;
                        repeatable: boolean;
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        /** @constant */
                        type: 'dynamiczone';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        components: string[];
                        required?: boolean;
                        min?: number;
                        max?: number;
                      }
                    | {
                        /** @constant */
                        type: 'uid';
                        /** @constant */
                        configurable?: false;
                        private?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                        targetField?: string;
                      }
                    | {
                        type: string;
                        required?: boolean;
                        unique?: boolean;
                        default?: unknown;
                        min?: number | string;
                        max?: number | string;
                        minLength?: number;
                        maxLength?: number;
                        enum?: string[];
                        regex?: string;
                        private?: boolean;
                        configurable?: boolean;
                        pluginOptions?: {
                          [key: string]: unknown;
                        };
                      };
                };
                pluginOptions?: {
                  [key: string]: unknown;
                };
              };
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'upload/post': {
    parameters: {
      query?: {
        id?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json':
            | {
                id: number;
                /** Format: uuid */
                documentId: string;
                name: string;
                alternativeText?: string | null;
                caption?: string | null;
                width?: number;
                height?: number;
                formats?: {
                  [key: string]: unknown;
                };
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string | null;
                folder?: number;
                folderPath: string;
                provider: string;
                provider_metadata?: {
                  [key: string]: unknown;
                } | null;
                createdAt: string;
                updatedAt: string;
                createdBy?: number;
                updatedBy?: number;
              }
            | {
                id: number;
                /** Format: uuid */
                documentId: string;
                name: string;
                alternativeText?: string | null;
                caption?: string | null;
                width?: number;
                height?: number;
                formats?: {
                  [key: string]: unknown;
                };
                hash: string;
                ext?: string;
                mime: string;
                size: number;
                url: string;
                previewUrl?: string | null;
                folder?: number;
                folderPath: string;
                provider: string;
                provider_metadata?: {
                  [key: string]: unknown;
                } | null;
                createdAt: string;
                updatedAt: string;
                createdBy?: number;
                updatedBy?: number;
              }[];
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'upload/get/files': {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | '*'
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
        sort?:
          | string
          | string[]
          | {
              [key: string]: 'asc' | 'desc';
            }
          | {
              [key: string]: 'asc' | 'desc';
            }[];
        pagination?: {
          /** @description Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /** @description Page number (1-based) */
              page: number;
              /** @description Number of entries per page */
              pageSize: number;
            }
          | {
              /** @description Number of entries to skip */
              start: number;
              /** @description Maximum number of entries to return */
              limit: number;
            }
        );
        filters?: {
          [key: string]: unknown;
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            /** Format: uuid */
            documentId: string;
            name: string;
            alternativeText?: string | null;
            caption?: string | null;
            width?: number;
            height?: number;
            formats?: {
              [key: string]: unknown;
            };
            hash: string;
            ext?: string;
            mime: string;
            size: number;
            url: string;
            previewUrl?: string | null;
            folder?: number;
            folderPath: string;
            provider: string;
            provider_metadata?: {
              [key: string]: unknown;
            } | null;
            createdAt: string;
            updatedAt: string;
            createdBy?: number;
            updatedBy?: number;
          }[];
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'upload/get/files_by_id': {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | '*'
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
      };
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            /** Format: uuid */
            documentId: string;
            name: string;
            alternativeText?: string | null;
            caption?: string | null;
            width?: number;
            height?: number;
            formats?: {
              [key: string]: unknown;
            };
            hash: string;
            ext?: string;
            mime: string;
            size: number;
            url: string;
            previewUrl?: string | null;
            folder?: number;
            folderPath: string;
            provider: string;
            provider_metadata?: {
              [key: string]: unknown;
            } | null;
            createdAt: string;
            updatedAt: string;
            createdBy?: number;
            updatedBy?: number;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'upload/delete/files_by_id': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            /** Format: uuid */
            documentId: string;
            name: string;
            alternativeText?: string | null;
            caption?: string | null;
            width?: number;
            height?: number;
            formats?: {
              [key: string]: unknown;
            };
            hash: string;
            ext?: string;
            mime: string;
            size: number;
            url: string;
            previewUrl?: string | null;
            folder?: number;
            folderPath: string;
            provider: string;
            provider_metadata?: {
              [key: string]: unknown;
            } | null;
            createdAt: string;
            updatedAt: string;
            createdBy?: number;
            updatedBy?: number;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'i18n/get/locales': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            /** Format: uuid */
            documentId: string;
            name: string;
            code: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string | null;
            isDefault: boolean;
          }[];
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/connect_____': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/auth_local': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          identifier: string;
          password: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            jwt: string;
            refreshToken?: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/auth_local_register': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          username: string;
          /** Format: email */
          email: string;
          password: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json':
            | {
                jwt: string;
                refreshToken?: string;
                user: {
                  id: number;
                  documentId: string;
                  username: string;
                  email: string;
                  provider: string;
                  confirmed: boolean;
                  blocked: boolean;
                  role?:
                    | number
                    | {
                        id: number;
                        name: string;
                        description: string | null;
                        type: string;
                        createdAt: string;
                        updatedAt: string;
                      };
                  createdAt: string;
                  updatedAt: string;
                  publishedAt: string;
                };
              }
            | {
                user: {
                  id: number;
                  documentId: string;
                  username: string;
                  email: string;
                  provider: string;
                  confirmed: boolean;
                  blocked: boolean;
                  role?:
                    | number
                    | {
                        id: number;
                        name: string;
                        description: string | null;
                        type: string;
                        createdAt: string;
                        updatedAt: string;
                      };
                  createdAt: string;
                  updatedAt: string;
                  publishedAt: string;
                };
              };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/auth_by_provider_callback': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        provider: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            jwt: string;
            refreshToken?: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/auth_forgot_password': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          /** Format: email */
          email: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            ok: boolean;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/auth_reset_password': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          code: string;
          password: string;
          passwordConfirmation: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            jwt: string;
            refreshToken?: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/auth_email_confirmation': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/auth_send_email_confirmation': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          /** Format: email */
          email: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            email: string;
            sent: boolean;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/auth_change_password': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          currentPassword: string;
          password: string;
          passwordConfirmation: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            jwt: string;
            refreshToken?: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/auth_refresh': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/auth_logout': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/users_count': {
    parameters: {
      query?: {
        filters?: {
          [key: string]: unknown;
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': number;
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/users': {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | '*'
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
        sort?:
          | string
          | string[]
          | {
              [key: string]: 'asc' | 'desc';
            }
          | {
              [key: string]: 'asc' | 'desc';
            }[];
        pagination?: {
          /** @description Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /** @description Page number (1-based) */
              page: number;
              /** @description Number of entries per page */
              pageSize: number;
            }
          | {
              /** @description Number of entries to skip */
              start: number;
              /** @description Maximum number of entries to return */
              limit: number;
            }
        );
        filters?: {
          [key: string]: unknown;
        };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          }[];
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/users': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          username: string;
          /** Format: email */
          email: string;
          password: string;
          role?: number;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/users_me': {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | '*'
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/users_by_id': {
    parameters: {
      query?: {
        fields?: string | string[];
        populate?:
          | '*'
          | string
          | string[]
          | {
              [key: string]: unknown;
            };
      };
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/put/users_by_id': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          username?: string;
          /** Format: email */
          email?: string;
          password?: string;
          role?: number;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/delete/users_by_id': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/roles_by_id': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            role: {
              id: number;
              documentId: string;
              name: string;
              description: string | null;
              type: string;
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
              nb_users?: number;
              permissions?: {
                [key: string]: {
                  controllers: {
                    [key: string]: {
                      [key: string]: {
                        enabled: boolean;
                        policy: string;
                      };
                    };
                  };
                };
              };
              users?: unknown[];
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/roles': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            roles: {
              id: number;
              documentId: string;
              name: string;
              description: string | null;
              type: string;
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
              nb_users?: number;
              permissions?: {
                [key: string]: {
                  controllers: {
                    [key: string]: {
                      [key: string]: {
                        enabled: boolean;
                        policy: string;
                      };
                    };
                  };
                };
              };
              users?: unknown[];
            }[];
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/post/roles': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          name: string;
          description?: string;
          type: string;
          permissions?: {
            [key: string]: unknown;
          };
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            ok: boolean;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/put/roles_by_role': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        role: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        'application/json': {
          name?: string;
          description?: string;
          type?: string;
          permissions?: {
            [key: string]: unknown;
          };
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            ok: boolean;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/delete/roles_by_role': {
    parameters: {
      query?: never;
      header?: never;
      path: {
        role: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            ok: boolean;
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  'users-permissions/get/permissions': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            permissions: {
              [key: string]: {
                controllers: {
                  [key: string]: {
                    [key: string]: {
                      enabled: boolean;
                      policy: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
      /** @description Bad request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
}

export function createClient(config: Config) {
  return strapi<paths>(config);
}
