import type { QueryParam } from '@/types.ts';

export const BASE_URL = 'http://localhost:1337';

export const BASE_API_PATH = '/api';

export const DEFAULT_COLLECTION_QUERIES = {
  populate: ['image'],
  sort: 'createdAt:desc',
  fields: ['name'],
  filters: { name: { $contains: 'e' } },
} satisfies Record<QueryParam, unknown>;
