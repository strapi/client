import { useStrapi } from '@/hooks/useStrapi.ts';

import type { File } from '@/types.ts';
import React from 'react';
import toast from 'react-hot-toast';

export const useFiles = () => {
  const strapi = useStrapi();
  const [files, setFiles] = React.useState<File[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await strapi.files.find();
      setFiles(response);
      toast.success(`${response.length} files fetched successfully`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${error}`);
    }
  };

  return [files, fetchFiles] as const;
};
