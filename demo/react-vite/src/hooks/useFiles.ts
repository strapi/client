import { useStrapi } from '@/hooks/useStrapi.ts';

import type { File } from '@/types.ts';
import React from 'react';
import toast from 'react-hot-toast';

export const useFiles = () => {
  const strapi = useStrapi();
  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const fetchFiles = async () => {
    try {
      const response = await strapi.files.find();
      setFiles(response);
      toast.success(`${response.length} files fetched successfully`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${error}`);
    }
  };

  const uploadFiles = async (filesToUpload: globalThis.File[]) => {
    setIsUploading(true);

    const uploadPromises: Promise<any>[] = [];
    const successfulUploads: string[] = [];
    const failedUploads: string[] = [];

    try {
      for (const file of filesToUpload) {
        console.log('Uploading file:', file);
        const uploadPromise = strapi.files
          .upload(file, {
            fileInfo: {
              name: file.name,
              alternativeText: `Uploaded file: ${file.name}`,
              caption: `File uploaded via React demo - ${new Date().toLocaleString()}`,
            },
          })
          .then(() => {
            successfulUploads.push(file.name);
          })
          .catch((error) => {
            console.error(`Failed to upload ${file.name}:`, error);
            failedUploads.push(file.name);
          });

        uploadPromises.push(uploadPromise);
      }

      // Wait for all uploads to complete
      await Promise.allSettled(uploadPromises);

      // Show success/error messages
      if (successfulUploads.length > 0) {
        toast.success(`Successfully uploaded ${successfulUploads.length} file(s)`);
      }

      if (failedUploads.length > 0) {
        toast.error(
          `Failed to upload ${failedUploads.length} file(s): ${failedUploads.join(', ')}`
        );
      }

      await fetchFiles();
    } catch (error) {
      toast.error('Upload process failed');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const updateFile = async (
    fileId: number,
    updateData: { name?: string; alternativeText?: string; caption?: string }
  ) => {
    try {
      await strapi.files.update(fileId, updateData);
      toast.success('File updated successfully');
      await fetchFiles();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update file');
    }
  };

  const deleteFile = async (fileId: number) => {
    try {
      await strapi.files.delete(fileId);
      toast.success('File deleted successfully');
      await fetchFiles();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete file');
    }
  };

  return { files, fetchFiles, uploadFiles, updateFile, deleteFile, isUploading };
};
