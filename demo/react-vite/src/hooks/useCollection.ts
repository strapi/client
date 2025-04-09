import { useStrapi } from '@/hooks/useStrapi.ts';

export const useCollection = (collectionName: string) => {
  const strapi = useStrapi();

  return strapi.collection(collectionName);
};
