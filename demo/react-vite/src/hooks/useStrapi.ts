import { BASE_API_PATH, BASE_URL } from '@/utils/constants';
import type { Strapi } from '@strapi/client';
import { strapi } from '@strapi/client';
import { useMemo } from 'react';

export function useStrapi() {
  return useMemo(() => createClient(), []);
}

function createClient(): Strapi {
  const apiToken = process.env.FULL_ACCESS_TOKEN;

  if (!apiToken) {
    throw new Error('API token not found. Please set FULL_ACCESS_TOKEN in .env');
  }

  const baseURL = `${BASE_URL}${BASE_API_PATH}`;

  return strapi({ baseURL, auth: apiToken });
}
