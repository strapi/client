import { CTA } from '@/components/CTA.tsx';
import { FileGallery } from '@/components/FileGallery.tsx';
import { FileUpload } from '@/components/FileUpload.tsx';
import { useFiles } from '@/hooks/useFiles.ts';
import { Layout } from '@/layouts/Layout.tsx';
import React from 'react';

export const FilesDemo: React.FC = () => {
  const { files, fetchFiles, uploadFiles, isUploading } = useFiles();

  const handleUpload = async (filesToUpload: globalThis.File[]) => {
    await uploadFiles(filesToUpload);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <CTA value={files.length ? 'Reload Files' : 'Fetch Files'} onClick={fetchFiles} />
        </div>
        <div className="w-full">
          <FileUpload onUpload={handleUpload} isUploading={isUploading} />
        </div>
        <div className="w-full">
          {files.length > 0 && (
            <div className="mb-4 text-center">
              <h2 className="text-xl font-semibold text-white">
                Media Library ({files.length} files)
              </h2>
            </div>
          )}
          <FileGallery files={files} />
        </div>
      </div>
    </Layout>
  );
};
