import { useStrapi } from '@/hooks/useStrapi.ts';

import type { File } from '@/types.ts';
import React from 'react';

export const useFiles = () => {
  const strapi = useStrapi();
  const [files, setFiles] = React.useState<File[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await strapi.files.find();
      setFiles(response);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return [files, fetchFiles] as const;
};
