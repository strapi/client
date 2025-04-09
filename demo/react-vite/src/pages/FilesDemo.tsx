import { CTA } from '@/components/CTA.tsx';
import { FileGallery } from '@/components/FileGallery.tsx';
import { useFiles } from '@/hooks/useFiles.ts';
import { Layout } from '@/layouts/Layout.tsx';
import React from 'react';

export const FilesDemo: React.FC = () => {
  const [files, fetchFiles] = useFiles();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <CTA value={files.length ? 'Reload Files' : 'Fetch Files'} onClick={fetchFiles} />
        <FileGallery files={files} />
      </div>
    </Layout>
  );
};
